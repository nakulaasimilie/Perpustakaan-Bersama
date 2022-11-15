import { Flex, Box, Text, Link, Icon, Image, useColorModeValue } from '@chakra-ui/react'
import instagramLogo from '../assets/img/instagram.png'
import bank_bca from '../assets/img/metode_pembayaran/bank_bca.png'
import bank_mandiri from '../assets/img/metode_pembayaran/bank_mandiri.png'
import bank_permata from '../assets/img/metode_pembayaran/bank_permata.png'
import gopay from '../assets/img/metode_pembayaran/gopay.png'
import ovo from '../assets/img/metode_pembayaran/ovo.png'
import shopee from '../assets/img/metode_pembayaran/shopee.png'
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdWifiCalling3 } from 'react-icons/md';
import { RiWhatsappFill } from 'react-icons/ri';

export default function Footer() {
  return (
    <>
      <Flex flexWrap={'wrap'} bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')} minH={'200px'} justifyContent={'center'} padding={'30px'} pt='20px'>
        {/* -------------------- Box 1 -------------------- */}
        <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Image src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg" width='180px' height='40px' />
          <Box display='flex' mt='5px'>
            <Flex align='center' h='45px' w='45px' justifyContent='center'><Icon boxSize='8' as={MdEmail} /></Flex>
            <Box>
              <Box><Text fontSize='sm' fontWeight='bold' >Email</Text></Box>
              <Box><Text fontSize='sm' >cs.openlibrary@gmail.com</Text></Box>
            </Box>
          </Box>
          <Box display='flex' mt='5px'>
            <Flex align='center' h='45px' w='45px' justifyContent='center'><Icon boxSize='8' as={RiWhatsappFill} /></Flex>
            <Box>
              <Box><Text fontSize='sm' fontWeight='bold' >Chat WhatsApp</Text></Box>
              <Box><Text fontSize='sm' >+62 852-1234-1234</Text> </Box>
            </Box>
          </Box>
          <Box display='flex' mt='5px'>
            <Flex align='center' h='45px' w='45px' justifyContent='center'><Icon boxSize='8' as={MdWifiCalling3} /></Flex>
            <Box>
              <Box><Text fontSize='sm' fontWeight='bold' >Call Center</Text></Box>
              <Box><Text fontSize='sm' >+021 123-1234-23</Text> </Box>
            </Box>
          </Box>
        </Box>

        {/* -------------------- Tentang Healthymed -------------------- */}
        <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Text fontWeight='bold' >Tentang Open Library</Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>Kebijakan Privasi</Link></Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>Syarat & Ketentuan</Link></Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>Cara Belanja</Link></Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>Tentang kami</Link></Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>FAQ</Link></Text>
          <Text mt='8px' fontSize='sm' fontWeight='semibold' ><Link>Karir</Link></Text>
        </Box>

        {/* -------------------- Our Healthymed Sosmed -------------------- */}
        <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Text fontWeight='bold' >Ikuti Kami</Text>
          <Box display='flex' mt='5px' >
            <Link display='flex'>
              <Flex align='center' h='35px' w='40px' color='#3b5998'><Icon boxSize='6' as={FaFacebookF} /></Flex>
              <Flex align='center'>
                <Box><Text fontSize='md' fontWeight='bold' color='#3b5998'>Facebook</Text></Box>
              </Flex>
            </Link>
          </Box>
          <Box display='flex' mt='5px' >
            <Link display='flex'>
              <Flex align='center' h='35px' w='40px'>
                <Image src={instagramLogo} width='25px' height='25px' />
              </Flex>
              <Flex align='center'>
                <Box><Text fontSize='md' fontWeight='bold' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Instagram</Text></Box>
              </Flex>
            </Link>
          </Box>
          <Box display='flex' mt='5px' >
            <Link display='flex'>
              <Flex align='center' h='35px' w='40px' color='#1DA1F2'><Icon boxSize='6' as={FaTwitter} /></Flex>
              <Flex align='center'>
                <Box><Text fontSize='md' fontWeight='bold' color='#1DA1F2'>Twitter</Text></Box>
              </Flex>
            </Link>
          </Box>
        </Box>

        {/* -------------------- Healthymed Payment Method -------------------- */}
        <Box flexWrap='wrap' width='310px' m='5px' mt='15px'>
          <Text fontWeight='bold' >Metode Pembayaran</Text>
          <Box mt='10px' display='flex' flexWrap='wrap'>
            <Box mr='10px' pt='10px'>
              <Image src={bank_bca} width='70px' height='23px' />
            </Box>
            <Box mr='10px'>
              <Image src={bank_mandiri} width='100px' height='30px' />
            </Box>
            <Box mr='10px'>
              <Image src={bank_permata} width='110px' height='35px' />
            </Box>
            <Box mr='10px' pt='15px'>
              <Image src={gopay} width='100px' height='25px' />
            </Box>
            <Box mr='10px' pt='10px'>
              <Image src={ovo} width='50px' height='35px' />
            </Box>
            <Box pt='5px'>
              <Image src={shopee} width='80px' height='50px' />
            </Box>

          </Box>
        </Box>
        <Box display='flex' width='310px' mx='5px'></Box>
        <Box display='flex' width='310px' mx='5px'></Box>
        <Box display='flex' width='310px' mx='5px'></Box>
      </Flex>
    </>
  )
}