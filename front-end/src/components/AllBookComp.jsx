import { Box, Button, Icon, Text, useToast, Image, Stack, Flex, FormControl, Select, InputGroup, Input, InputRightElement, FormHelperText, Tooltip, useColorModeValue, Center } from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";
// import NextLink from 'next/link';
import Axios from "axios";
import { useFetcher } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncData } from '../redux/bookSlice';
import { BiSearchAlt, BiReset } from 'react-icons/bi';
import { BsFilterLeft } from 'react-icons/bs';
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactPaginate from 'react-paginate';



export default function BookCard() {
    const [limit, setLimit] = useState(16)
    const [searchProduct, setSearchProduct] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bookSlice.value);
    console.log(data)

    const getData = async () => {
        try {
    
            const res = await Axios.get("http://localhost:2000/book/list")
            dispatch(syncData(res.data));
            
        } catch (err) {

            console.log(err);
            }
        };
        
        useEffect(() => {
            getData()
        }, [])

  // ---------------------- filter name and product code ---------------------- //
    const formik = useFormik({
        initialValues: {
            searchName: ``,
        },
        validationSchema: Yup.object().shape({
            searchName: Yup.string()
            .min(3, 'Minimal 3 huruf')
        }),
        validateOnChange: false,
        onSubmit: async () => {
            const { searchName } = formik.values;

            setSearchProduct(searchName)
            setPage(1)
        }
    })


    return (
        <>

        <Flex flexWrap={'wrap'}  color={useColorModeValue("black", "white")}>
            <Box className='filter' mr='10px'>

                {/* {/* ---------- Sort By name and Price ---------- */}
                    <Box w='220px' m='10px' mb='20px' borderWidth='1px' boxShadow='md' borderRadius='7px'>
                        <Box alignItems={'center'} h='50px' borderTopRadius='7px' align='center' bg='pink.400' display='flex'>
                            <Box h='25px' w='30px' ml='10px'>
                            <Icon boxSize='6' as={BsFilterLeft}  />
                            </Box>
                            <Box h='25px'>
                            <Text mx='10px' fontWeight='bold' >
                                Urut Berdasarkan
                            </Text>
                            </Box>
                        </Box>
                        <Box p='15px'>
                            <FormControl  isInvalid={formik.errors.sortByProduct}  >
                            <Select onChange={(event) => {
                            // fetchProduct(event.target.value)
                        }}>
                            <option value=''><Text color={useColorModeValue("black", "white")}>-- Pilih --</Text></option>
                            <option value='product_asc'>Nama A-Z</option>
                            <option value='product_des'>Nama Z-A</option>
                        </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
                <Box mx='5px' my='10px' maxW='810px'>
                <Box display='flex' justifyContent='space-between' mb='10px'>

                {/* ---------- Search filter by Name ---------- */}
                <Box mx='10px' display='flex'>
                {/* {formik.values.searchName} */}
                <FormControl isInvalid={formik.errors.searchName}>
                    <InputGroup >
                    <Input placeholder="Cari Buku" id='search' type='text' bg='white'
                        onChange={(event) => formik.setFieldValue("searchName", event.target.value)} />
                    <InputRightElement>
                        <Icon
                        fontSize="xl"
                        as={BiSearchAlt}
                        sx={{ _hover: { cursor: "pointer" } }}
                        onClick={() => formik.handleSubmit()}
                        />
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText color="red">
                    {formik.errors.searchName}
                    </FormHelperText>
                </FormControl>
                <Tooltip label='reset filter' fontSize='sm'>
                    <Button ml='5px' colorScheme="pink"
                    onClick={() => {
                        async function submit() {
                        setSearchProduct('')
                        document.getElementById("search").value = '';
                        formik.values.searchName = ''
                        } submit()
                    }} >
                    <Icon boxSize='6' as={BiReset} />
                    </Button>
                </Tooltip>
                </Box>
                </Box>
            </Box>
        </Flex> 

    <Center>
        <Flex flexWrap={'wrap'}>
            {data.map(item => {
        return (
            <Box w='180px' h='293px' borderWidth='1px' m='10px' _hover={{ boxShadow: 'xl' }} boxShadow='base' borderRadius='13px'>
                <Box h='155px' w='full' _hover={{ cursor: "pointer" }} borderTopRadius='13px' overflow='hidden'>
                    <Image objectFit='cover' src={item.Images} width='180px' height='155px' />
                </Box>

                <Box px='10px' h='90px'>
                <Box h='50px'>
                    <Text _hover={{ cursor: 'pointer', color: "pink" }} fontWeight='bold'>
                        {item.Title.substring(0, 25)}{item.Title.length >= 25 ? '...' : null}
                    </Text>
                </Box>
                <Box display='flex' fontSize='xs'>
                        <Text fontWeight='bold' color='#213360' textColor='#FF6B6B' mr='5px'> {item.Author} </Text>
                </Box>
                </Box>
                <Box pb='12px' px='10px' h='40px'>
                <Button w='full' borderColor="pink.400" borderRadius='9px' borderWidth='2px' size='sm' my='5px'
                    _hover={{ bg: "pink", color: 'white' }}>
                    <Icon boxSize='4' as={IoCartOutline} mr='5px' />
                    Keranjang
                </Button>
                </Box>
            </Box>
        )
        })}
        </Flex>
    </Center>

    <Center>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            // onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            // pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
    </Center>
        
    </>
    )
}


// {data.map(item => {
//     return (
// <Box w='180px' h='293px' borderWidth='1px' m='10px' _hover={{ boxShadow: 'xl' }} boxShadow='base' borderRadius='13px' bg='white'>
//     <Box h='155px' w='full' _hover={{ cursor: "pointer" }} borderTopRadius='13px' overflow='hidden'>
//         <Image objectFit='cover' src={item.Images} width='180px' height='155px' />
//     </Box>

//     <Box px='10px' h='90px'>
//     <Box h='50px'>
//         <Text _hover={{ cursor: 'pointer', color: '#009B90' }} fontWeight='bold' color='#213360'>
//             {item.Title.substring(0, 32)}{item.Title.length >= 32 ? '...' : null}
//         </Text>
//     </Box>
//     <Box display='flex' fontSize='xs'>
//             <Text fontWeight='bold' color='#213360' textColor='#FF6B6B' mr='5px'> {item.Author} </Text>
//             <Text fontWeight='semibold' color='#737A8D'>Rp {item.Genre}</Text>
//     </Box>
//     {/* <Text fontWeight='semibold' color='#213360' fontSize='sm' fontFamily='sans-serif'>{item.Publisher}</Text> */}
//     </Box>

//     <Box pb='12px' px='10px' h='40px'>
//     <Button w='full' borderColor='#009B90' borderRadius='9px' bg='white' borderWidth='2px' size='sm' my='5px'
//         _hover={{ bg: '#009B90', color: 'white' }}>
//         <Icon boxSize='4' as={IoCartOutline} mr='5px' />
//         Keranjang
//     </Button>
//     </Box>
// </Box>
// )
// })}


 {/* <Flex flexWrap={'wrap'} justifyContent={'center'} color={useColorModeValue("black", "white")}>
            <Box className='filter' mr='10px'>

                {/* ---------- Sort By name and Price ---------- */}
        //         <Box w='220px' m='10px' mb='20px' borderWidth='1px' boxShadow='md' borderRadius='7px'>
        //             <Box alignItems={'center'} h='50px' borderTopRadius='7px' align='center' bg='pink.400' display='flex'>
        //                 <Box h='25px' w='30px' ml='10px'>
        //                 <Icon boxSize='6' as={BsFilterLeft}  />
        //                 </Box>
        //                 <Box h='25px'>
        //                 <Text mx='10px' fontWeight='bold' >
        //                     Urut Berdasarkan
        //                 </Text>
        //                 </Box>
        //             </Box>
        //             <Box p='15px'>
        //                 <FormControl  isInvalid={formik.errors.sortByProduct}  >
        //                 <Select onChange={(event) => {
        //                     // fetchProduct(event.target.value)
        //                 }}>
        //                     <option value=''><Text color={useColorModeValue("black", "white")}>-- Pilih --</Text></option>
        //                     <option value='product_asc'>Nama A-Z</option>
        //                     <option value='product_des'>Nama Z-A</option>
        //                     <option value='price_des'>Harga Tertinggi</option>
        //                     <option value='price_asc'>Harga Terendah</option>
        //                 </Select>
        //                 </FormControl>
        //             </Box>
        //         </Box>
        //     </Box>
        //         <Box mx='5px' my='10px' maxW='810px'>
        //     <Box display='flex' justifyContent='space-between' mb='10px'>

        //         {/* ---------- Pagination limit---------- */}
        //         <Box display='flex' alignSelf='center' ml='10px'>
        //         <Text alignSelf='center' mr='10px'>Show</Text>
        //         {formik.values.limiter}
        //         <Select size='sm' bg='white' borderRadius='5px'
        //             onChange={(event) => { setLimit(event.target.value) }}>
        //             <option value='16'>16</option>
        //             <option value='24'>24</option>
        //         </Select>
        //         </Box>

        //         {/* ---------- Search filter by Name ---------- */}
        //         <Box mx='10px' display='flex'>
        //         {/* {formik.values.searchName} */}
        //         <FormControl isInvalid={formik.errors.searchName}>
        //             <InputGroup >
        //             <Input placeholder="Cari Nama Produk" id='search' type='text' bg='white'
        //                 onChange={(event) => formik.setFieldValue("searchName", event.target.value)} />
        //             <InputRightElement>
        //                 <Icon
        //                 fontSize="xl"
        //                 as={BiSearchAlt}
        //                 sx={{ _hover: { cursor: "pointer" } }}
        //                 onClick={() => formik.handleSubmit()}
        //                 />
        //             </InputRightElement>
        //             </InputGroup>
        //             <FormHelperText color="red">
        //             {formik.errors.searchName}
        //             </FormHelperText>
        //         </FormControl>
        //         <Tooltip label='reset filter' fontSize='sm'>
        //             <Button ml='5px' colorScheme="pink"
        //             onClick={() => {
        //                 async function submit() {
        //                 setSearchProduct('')
        //                 // setTheParams('')
        //                 document.getElementById("search").value = '';
        //                 formik.values.searchName = ''
        //                 } submit()
        //             }} >
        //             <Icon boxSize='6' as={BiReset} />
        //             </Button>
        //         </Tooltip>
        //         </Box>
        //         </Box>
        //     </Box>
        //     <Box display='flex' justifyContent='center' alignContent='center'>
        //     <Button onClick={() => {
        //         async function submit() {
        //             setPage(page == 1 ? 1 : page - 1)
        //         } submit()
        //         var pageNow = page - 1
        //         pageNow = pageNow <= 0 ? 1 : pageNow
        //         document.getElementById("pagingInput").value = parseInt(pageNow)
        //         }}
        //         size='sm' m='3px' borderColor="pink.400" borderRadius='9px' borderWidth='2px'>Prev</Button>
        //         <Input w='50px' type='number' id='pagingInput' textAlign='center' bg='white' defaultValue={page} onChange={(e) => {
        //         // eslint-disable-next-line no-unused-expressions
        //         !e.target.value ? null : e.target.value > totalPage || e.target.value <= 0 ? e.target.value = page :
        //             setPage(parseInt(e.target.value))
        //         }} />
        //         <Text alignSelf='center' mx='5px'>of {totalPage}</Text>
        //         <Button onClick={() => {
        //         async function submit() {
        //             setPage(totalPage == page ? page : page + 1)
        //         } submit()
        //         var pageNow = page + 1
        //         pageNow = pageNow > totalPage ? page : pageNow
        //         document.getElementById("pagingInput").value = parseInt(pageNow);
        //         }} size='sm' m='3px' borderColor="pink.400" borderRadius='9px' borderWidth='2px'>Next</Button>
        //     </Box>
        // </Flex> */}