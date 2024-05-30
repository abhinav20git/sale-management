import{
   Box, 
   Button,  
   Center,  
   Checkbox,  
   Flex, 
   FormControl, 
   FormHelperText, 
   FormLabel,
   HStack,
   Heading,
   Input, 
   Stack, 
   useColorMode, 
   useDisclosure
  } from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import {Multiselect} from 'multiselect-react-dropdown';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { REQUIRED_VALIDATION } from '../../utils/utils';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { customerData } from '../../utils/customerData';
import ThemeToggler from './ThemeToggler';

  
      
const SaleSummary = () => {
    
    const [name, setName] = useState("")
    const [price,setPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
      
    const [date,setDate] = useState("")
    const [id,setId] = useState(0);
    const [isUpdate,setIsUpdate] = useState(false)
    const [data,setData]=useState([]);
    const [active,setActive] = useState(true)
    const [view,setView] = useState(false);
    const [error,setError] = useState(null)
    const [options,setOption] = 
    useState(["Stocked Product 1 ", "Stocked Product 2 ", "Stocked Product 3 "])
    const [product,setProduct] = useState ([]) 
    const [paid,setPaid] = useState();
    


    useEffect(()=>{
        setData(customerData)
    },[])
    
    const schema = yup
      .object()
      .shape({
        name: yup.string().required( REQUIRED_VALIDATION("Name"),),
        product: yup.string().required( REQUIRED_VALIDATION("Product"),),
        price: yup.number().required(REQUIRED_VALIDATION("Price"),),
        quantity:yup.number().required(REQUIRED_VALIDATION("Quantity"),),
      })

    const { register, handleSubmit,formState:{errors} } = useForm({
      reValidateMode:"onSubmit ",
      resolver: yupResolver(schema),

    })

    const onSubmit = (values) =>{
      console.log("Values:...",values)    
    }

    const onError = (error) =>{
      console.log("Error:...",error)
      setError(true)
      
    }
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleEdit=(id)=>{
        onOpen()
        const dt=data.filter(item=>item.id===id)
        if(dt!==undefined){
            setIsUpdate(true)
            setId(id)
            setName(dt[0].name);
            setPrice(dt[0].price);
            setQuantity(dt[0].quantity)
            setProduct(dt[0].product)
            setDate(dt[0].date)
        }
        

        
    }
    const handleClear=()=>{
        setId(0);
        setName("");
        setProduct([]);
        setPrice("");
        setQuantity("");
        setDate("");
    }
    const handleUpdate=()=>{
        const index=data.map((item)=>{
            return item.id
        }).indexOf(id)
        const dt=[...data];
        dt[index].name=name;
        dt[index].product=product;
        dt[index].price=price;
        dt[index].quantity=quantity;
        dt[index].date=date;
        console.log(dt);
        setData(dt)
        handleClear()
        onClose()
        setIsUpdate(false)
        
    }

    const handleAdd=()=>{
      
        setIsUpdate(false);
        const dt=[...data];
        const newQbj={
            id:customerData.length+1,
            name:name,
            product:product,
            price:price,
            quantity:quantity,
            date:date
        }
        dt.push(newQbj);
        setData(dt)
        if(error){
            alert("You must fill the form correctly")
        }
        else{
            // handleClear()
            onClose()
        }
      
    }

    const handleSave=()=>{
        setView(false);
        handleClear()
        setIsUpdate(false)
        onOpen()
    }

    const handleActive=()=>{
        setActive(true)
        setView(false)
    }

    const handleView=(id)=>{
        onOpen()
        const dt=data.filter(item=>item.id===id)
        if(dt!==undefined){
            setIsUpdate(true)
            setId(id)
            setName(dt[0].name);
            setPrice(dt[0].price);
            setQuantity(dt[0].quantity)
            setProduct(dt[0].product)
            setDate(dt[0].date)
        }
        setView(true)
    }
    const handleCompleted=()=>{
        setActive(false)
        
    }
    const { colorMode } = useColorMode(); 

    const handleUnPaid=()=>{
      setPaid(false);
    }

    const handlePaid=()=>{
      setPaid(true);
    }
  return (
    <>
    <ThemeToggler />
        <Center><Heading mt={8}>AgSpert Technologies Assessment</Heading></Center>
        <Center>
        <HStack>
            
            <Box>
        
        <Flex height="80px"   align="center" m="12">
        <Button onClick={()=>handleActive()}>
            Active Sale Order
        </Button>
        <Button m={2} onClick={()=>handleCompleted()}>
            Completed Sale Order
        </Button>
         
        <Button ml={56} onClick={onOpen}  onChange={()=>handleSave()}>+Sale Order</Button>
        
        <Modal
         size="full"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            {view ? <ModalHeader>View Sale Order</ModalHeader>: <ModalHeader>{isUpdate ? "Edit Sale Order" : "Create sale order"}</ModalHeader> 
}
            <ModalCloseButton />
            <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit,onError)} >
              <FormControl isRequired >
                <FormLabel  htmlFor='name' color={colorMode === 'dark' ? 'white' :  'black'}>Your Name</FormLabel>
                <Input color={colorMode === 'dark' ? 'white' :  'black'}
                        {...register('name')}
                  placeholder='Your name'
                  onChange={(e)=>setName(e.target.value)} 
                  value={name}
                  readOnly={view ? true:false}
                  />
                    
                  {errors && errors.name &&(
                  <FormHelperText>
                    {errors.name && errors.name.message}
                  </FormHelperText>)}
                  
              </FormControl>


              <FormControl isRequired >
                <FormLabel  htmlFor='product' color={colorMode === 'dark' ? 'white' :  'black'}>Select Products</FormLabel>
            
            <Multiselect
              selectedValues={[product]}
              options={options}
              isObject={false}
              onSelect={(e)=>setProduct(e)}
              onRemove={(e)=>setProduct(e)}
              readOnly={view ? true:false}
            /> 


            </FormControl>
              <FormControl  isRequired mt={4}>
                <FormLabel color={colorMode === 'dark' ? 'white' :  'black'}>Selling Rate</FormLabel>
                <Input 
                {...register('price')} 
                type='number' placeholder='Price' 
                onChange={(e)=>setPrice(e.target.value)}  
                value={price}  
                readOnly={view ? true:false}
                color={colorMode === 'dark' ? 'white' :  'black'}/>
                 {errors && errors.price &&(
                    <FormHelperText>
                    {errors.price && errors.price.message}
                  </FormHelperText>)}
              </FormControl>
              
              <FormControl  isRequired mt={4}>
                <FormLabel color={colorMode === 'dark' ? 'white' :  'black'}>Enter Quantity</FormLabel>
                <Input color={colorMode === 'dark' ? 'white' :  'black'}
                {...register('quantity')}
                type='number' 
                placeholder='Quantity' 
                onChange={(e)=>setQuantity(e.target.value)} 
                value={quantity}  
                readOnly={view ? true:false} />
                 {errors && errors.quantity &&(
                    <FormHelperText>
                    {errors.quantity && errors.quantity.message}
                  </FormHelperText>)}
              </FormControl>

              <FormControl  mt={4}>
                <FormLabel color={colorMode === 'dark' ? 'white' :  'black'}>Invoice Date</FormLabel>
                <Input placeholder='Select Date and Time' size='md' type='datetime-local' value={date} onChange={(e)=>setDate(e.target.value)} />
              </FormControl>

              <FormControl  mt={4}>
                <FormLabel color={colorMode === 'dark' ? 'white' :  'black'}>Payment</FormLabel>
                <Stack spacing={5} direction='row'>
                      <Checkbox colorScheme='red'  onChange={(e)=>handleUnPaid(e)}  >
                        Unpaid
                      </Checkbox> 
                      <Checkbox colorScheme='green' onChange={(e)=>handlePaid(e)} >
                        Paid
                      </Checkbox>
                </Stack>
              </FormControl>



                {isUpdate?<Button colorScheme='blue' mr={3} mt={4}  type='submit' onClick={()=>handleUpdate()} disabled={view?true:false}>
                                Update
                            </Button> : <Button colorScheme='blue' mr={3} mt={4}   type='submit' onClick={()=>handleAdd()}>
                                Add
                            </Button> 
                              
                }
              
                <Button mt={4}  onClick={()=>handleClear()}>
                    Clear
                </Button>
              </form>
            </ModalBody>
            
            <ModalFooter>
              
              <Button type='submit' onClick={onClose}>Cancel</Button>
            </ModalFooter>
            
          </ModalContent>
          
        </Modal>
        </Flex>
        
        </Box>
        </HStack>
        </Center>

        
        <Center>
        <HStack>
            <Box>
                <Center>
                <Flex mt={1}   align="center" >
                <TableContainer><hr/>
                    <Table  size='lg'>
                        
                        <Thead>
                        <Tr>
                        <Th>Sr.</Th>
                            <Th>Id</Th>
                            <Th>Name</Th>
                            <Th>Product</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th >Last Modified</Th>
                            <Th >Edit/View</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            { data.map((item,index)=>{
                                    return( <>
                                    {(!active) ? (item.paid &&
                                             <Tr key={index}>
                                            <Td>{index+ 1}</Td>
                                            {/* <Td>{(!active) ? (item.paid && item.id):item.id}</Td> */}
                                            <Td>{item.id}</Td>
                                            <Td>{ item.name}</Td>
                                            <Td>{item.product}</Td>
                                            <Td>{item.price}</Td>
                                            <Td>{item.quantity}</Td>
                                            <Td>{item.date}</Td>
                                            <Td>{active ? 
                                                    <Button onClick={()=>handleEdit(item.id)}>Edit</Button> :
                                                    <Button onClick={()=>handleView(item.id)}>View</Button> 
                                                }
                                            </Td>
                                            </Tr>
                                             ) : 
                                             (<Tr key={index}>
                                             <Td>{index+ 1}</Td>
                                             {/* <Td>{(!active) ? (item.paid && item.id):item.id}</Td> */}
                                             <Td>{item.id}</Td>
                                             <Td>{ item.name}</Td>
                                             <Td>{item.product}</Td>
                                             <Td>{item.price}</Td>
                                             <Td>{item.quantity}</Td>
                                             <Td>{item.date}</Td>
                                             <Td>{active ? 
                                                     <Button onClick={()=>handleEdit(item.id)}>Edit</Button> :
                                                     <Button onClick={()=>handleView(item.id)}>View</Button> 
                                                 }
                                             </Td>
                                             </Tr>)} 
                                            </>
                                        )
                                    }
                                )
                            }
                        
                        
                        </Tbody>
                        
                    </Table>
                </TableContainer>
                </Flex>
                </Center>
            </Box>
        </HStack>
        </Center>
        
    </>
  )
}

export default SaleSummary