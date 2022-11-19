    import { Box, Text, Button, Divider, Image } from '@chakra-ui/react';
    import { useSelector } from 'react-redux';

    export default function CartDetail() {
        const { NIM, isVerified, cart } = useSelector((state) => state.userSlice.value)


    return (
        <Box>
        <Text mx='15px' mb='5px' fontWeight='bold' fontSize='2xl' color='#213360'>
            Keranjang Saya
        </Text>

        <Box display='flex' justifyContent='center' flexWrap={'wrap'}>

            <Box minW='370px' w={'55vw'} mx='15px' my='10px' p='25px' px='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
            {
                cart.length === 0 ?
                <Box align='center'>
                    <Image src='/cart2.png' objectFit='contain' w='400px' h='300px' />
                    <Text textAlign='center' fontWeight='bold'>Keranjang anda kosong</Text>
                    <Text textAlign='center' fontWeight='bold' color='#009B90' w='150px' _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    Pinjam Sekarang
                    </Text>
                </Box>
                :
                <Text>Render barang</Text>}
            </Box>

            <Box h='250px' p='25px' minW='370px' w={'22vw'} mx='15px' mt='10px' mb='20px' justifyContent={'center'} boxShadow='md' bg='#ffffff' borderWidth='1px' borderRadius="10px">
            <Text fontWeight='bold' fontSize='lg'>
                Total
            </Text>
            <Box display='flex' mt='20px' justifyContent='space-between' >
                <Text fontWeight='semibold'>
                Sub Total Belanja
                </Text>
                <Text fontWeight='semibold'>
                Rp Segitu
                </Text>
            </Box>
            <Divider my='20px' />
            <Box display='flex' mt='20px' justifyContent='space-between' >
                <Text fontWeight='bold'>
                Jumlah Buku
                </Text>
                <Text fontWeight='bold'>
                3
                </Text>
            </Box>
            <Box mt='20px' display='flex' justifyContent='flex-end' >
                <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px'
                _hover={{ bg: '#009B90', color: 'white' }} disabled={cart.length === 0 ? true : false}>
                Order Sekarang
                </Button>
            </Box>
            </Box>

        </Box>
        </Box>
    )
    }