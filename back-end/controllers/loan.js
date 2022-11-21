const db = require("../models")
const user = db.User
const cart = db.Cart
const book = db.Book
const loan = db.Loan
const loan_detail = db.Loan_Detail
const { Op } = require("sequelize");

module.exports = {
    addLoan: async (req, res) => {
        try {
            const { Borrow_date, Return_date, data, NIM, isVerified, isActive } = req.body;

            if(!isVerified) throw "Akun anda belum di verifikasi, Lakukan Verifikasi terlebih dahulu"
            if(isActive !== 0) throw "Anda Mempunyai Transaksi yang masih aktif"
            if(Borrow_date === "" || Return_date === "") throw "Input tanggal peminjaman dan pengembalian dengn benar"
            if(Borrow_date === Return_date) throw  "Tanggal peminjaman dan pengembalian tidak boleh sama"
            if(Borrow_date > Return_date) throw  "Tanggal pengembalian tidak boleh lebih kecil dari peminjaman"

            let date = new Date()
            let tahun = date.getFullYear()
            const inv = await loan.findAll()
            const no_invoice = `OL-${tahun}${inv.length + 1}`

            await loan.create({
                no_invoice, Borrow_date, Return_date, UserNIM: NIM
            })

            data.map( async (item) => {
                await loan_detail.create({
                    BookId: item.Book.id,
                    LoanNoInvoice: no_invoice
                })
            })
            data.map( async (item) => {
                await cart.destroy({
                    where: {
                        id: item.id
                    }
                })
            })

            res.status(200).send({
                    massage: "Transaksi Succes",
                    no_invoice,
                });

        } catch(err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    getLoanActive: async (req, res) => {
        try {
            const { NIM } = req.params;
            const loans = await loan.findAll({
                where: {
                    [Op.and]: {
                        UserNIM: NIM,
                        transaction_status: ["Pengajuan", "Peminjaman"]
                    },
                },
                include: [
                {
                    model: loan_detail,
                    include: [
                        {
                            model: book,
                        }
                    ]  
                },
                ],
            });
            res.status(200).send(loans);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    cancelLoan: async (req, res) => {
        try {
            await loan.update(
                { transaction_status: "Batal" },
                {
                    where: {
                        no_invoice: req.params.inv,
                    },
                }
            );
            
            res.status(200).send({
                massage: "Transaksi Succes"
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}
