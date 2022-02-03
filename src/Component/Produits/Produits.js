import { PhoneIcon, AddIcon, WarningIcon, PlusSquareIcon } from '@chakra-ui/icons'
import React, { useRef, useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Button,
    FormControl,
    Input,
    FormLabel,
    Th,
    Td,
    TableCaption,
    HStack,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast,
    Select
} from '@chakra-ui/react'
import axios from 'axios';

function Produits() {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenaddTypeP, setIsOpenaddTypeP] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [addProduct, setaddProduct] = useState('');
    const [editProduit, seteditProduit] = useState("");
    const [editTypeProduit, seteditTypeProduit] = useState("");
    const [products, setproducts] = useState([]);
    const [produit, setproduit] = useState('');
    const [typeProduit, settypeProduit] = useState(0);
    const toast = useToast();

    const [typeproducts, settypeproducts] = useState([]);

    const onClose = () => {
        // const product = {nom:produit , typeProduit:{nomType:typeProduit}}
        //console.log('producc' , product)
        setIsOpen(false)

    }

    const onAddProduct = async () => {
        const product = { nom_produit: produit,  id_type_produit: parseInt(typeProduit ) }

       // console.log('producc', product)
        await axios.post("http://localhost:8080/api/produits", product).then(resp => {
           // console.log("kkkkaaa", resp.data);
            // setproducts(resp.data);

        }).catch(err => {
            console.log("error", err);
        })
        setIsOpen(false)
    }

     const handleEdit =(e)=>{
         const productName =e.target.id
    seteditProduit(productName);
        // console.log("first",id); 
        // const editer = typeproducts[parseInt(id)]
        // if(editer.produits.) 
         setIsOpenEdit(true);
     }
    const toastManager = () => {

        toast({
            title: 'Type Produit crée.',
            description: "le type est ajouté avec succes .",
            status: 'success',
            duration: 1000,
            isClosable: true,
        })

    }
    const onCloseaddTypeP = () => {
        //const product = {nom:produit , typeProduit:{nomType:typeProduit}}
        //console.log('producc' , product)
        setIsOpenaddTypeP(false)

    }
    const onCloseEdit = () => {
        setIsOpenEdit(false)

    }
    const onAddTypeProduit = async () => {
        const typeProduct = { nomType: addProduct }

        console.log('producccc', typeProduct)
        setIsOpenaddTypeP(false)

        await axios.post("http://localhost:8080/api/typeproduits", typeProduct).then(resp => {
            //console.log("kkkk", resp.data);
            setproducts(resp.data);

        }).catch(err => {
            console.log(err);
        })
        setaddProduct("");
        toastManager();

    }
    const cancelRef = useRef();

    const handleProduit = (e) => {
        setproduit(e.target.value)
    }
    const handleaddProduit = (e) => {
        setaddProduct(e.target.value)

    }
    const handleEditProduit =(e)=>{
      seteditProduit(e.target.value)
    }

    const handleTypeProduit = (e) => {
        settypeProduit(e.target.value)
    }
    //Load the product from the database
    const loadProducts = async () => {
        await axios.get("http://localhost:8080/api/produits").then(resp => {
            console.log("produits", resp.data);

            //setproducts(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }

    //Load the Types of  product from the database
    const loadTypeProducts = async () => {
        await axios.get("http://localhost:8080/api/typeproduits").then(resp => {
            console.log("typeProduit", resp.data);
            settypeproducts(resp.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        // loadProducts();
        loadTypeProducts();
    }, []);


    return <div>
        <Table variant='striped' colorScheme='teal' w="xl" >
            { /* <TableCaption>Imperial to metric conversion factors</TableCaption>*/}
            <Thead>
                <Tr>
                    <Th isNumeric>ID</Th>
                    <Th>Name</Th>
                    <Th >Date de création</Th>
                    <Th > Type</Th>
                    <Th >Action </Th>
                </Tr>
            </Thead>
            <Tbody>
              
                {typeproducts.map(product => {
                   // product.produits.map(produit => {})
                   return(
                     product.produits.map(produit=>{
                         return(
                            <Tr key={product.id} id={produit.id} >
                                
                            <Td>{produit.id}</Td>
                            <Td>{produit.nom}</Td>
                            <Td> {produit.dateCreation} </Td>
            
                            <Td > {product.nomType}</Td>
    
                            <Td > <Button color="red.500" onClick={handleEdit} id={produit.nom} >edit</Button></Td>
                        </Tr>
                         )
                     })
                   )

                   }
                
                   
                )}
                

            

            </Tbody>
            {/*
  <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot>
*/}
        </Table>

        <HStack pb={20}>
            <Box m={25} onClick={() => setIsOpen(true)}>
                <PlusSquareIcon w={6} h={6} color="red.500" />
                <h6>Produit</h6>
            </Box>
            <Box onClick={() => setIsOpenaddTypeP(true)} >
                <PlusSquareIcon w={6} h={6} color="red.500" />
                <h6>type Produit</h6>
            </Box>

        </HStack>

        {/*Dialog for adding a Product*/}
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Ajouter un produit
                    </AlertDialogHeader>

                    <AlertDialogBody>

                        <FormControl isRequired>
                            <FormLabel htmlFor='nom-produit'>Nom Produit</FormLabel>
                            <Input id='nomProduit' placeholder='nom produit' value={produit} onChange={handleProduit} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor='TypeProduit'>Type Produit</FormLabel>
                            <Select id='typeProduit' placeholder='Choisir un type' value={typeProduit} onChange={handleTypeProduit}>
                                {typeproducts.map(typeproduct => {
                                    return (
                                        <option value={typeproduct.id} >{typeproduct.nomType}</option>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onAddProduct} ml={3}>
                            Ajouter
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>



        {/*Dialog for adding a Type of Product*/}
        <AlertDialog
            isOpen={isOpenaddTypeP}
            leastDestructiveRef={cancelRef}
            onClose={onCloseaddTypeP}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Ajouter un produit
                    </AlertDialogHeader>

                    <AlertDialogBody>

                        <FormControl isRequired>
                            <FormLabel htmlFor='type-produit'>Nom Type Produit</FormLabel>
                            <Input id='typeProduit' placeholder='type produit' value={addProduct} onChange={handleaddProduit} />
                        </FormControl>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseaddTypeP}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onAddTypeProduit} ml={3}>
                            Ajouter
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>


        {/*Dialog for edting a  Product*/}
        <AlertDialog
            isOpen={isOpenEdit}
            leastDestructiveRef={cancelRef}
            onClose={onCloseEdit}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Ajouter un produit
                    </AlertDialogHeader>

                    <AlertDialogBody>

                        <FormControl isRequired>
                            <FormLabel htmlFor='nom-produit'>Nom Produit</FormLabel>
                            <Input id='nomProduit' placeholder='nom produit' value={editProduit} onChange={handleEditProduit} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor='TypeProduit'>Type Produit</FormLabel>
                            <Select id='typeProduit' placeholder='Téléphone' value={typeProduit} onChange={handleTypeProduit}>
                                {typeproducts.map(typeproduct => {
                                    return (
                                        <option>{typeproduct.nomType}</option>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseEdit}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={onCloseEdit} ml={3}>
                            update
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>


    </div>;
}

export default Produits;
