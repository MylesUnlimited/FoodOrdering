import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/api/products';

import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';

const CreateProductScreen = () => {
  //This section creates the variables used to assign a product its name, price, and image
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState(''); //Used to send out errors in case there is one
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams(); //this check for product id
  const id = parseFloat( // this checks if there is an id
    typeof idString === 'string' ? idString : idString?.[0] //this uses a ternary operator to denote what happens for true and false
    //if also have optional chaining to avoid outputting and ugly error/break and undefined instead, which would be taken as false
  );
  const isUpdating = !!idString; //This variable is very important. It tells the system if new product is being made, or one is being updated

  //These variables are for the hooks found within the product section of the api
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {// this is a react component use for synchronization with an external system
    if (updatingProduct) { //checking if updating or creating, if true you can update name, price and/or image of a product
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  //This section checks if a requiredd field has been correctly filled in.
  //If not, it returns false to the oncreate and onupdate functions, otherwise it is true
  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required'); //Tell the admin the product creation form isn't complete without a name
      return false;
    }
    if (!price) {
      setErrors('Price is required'); //Tells the admin that the form isn't complete without a price
      return false;
    }
    if (isNaN(parseFloat(price))) { //This checks if the price isn't a number, i.e., "four ninety-nine"
      setErrors('Price is not a number');
      return false;
    }
    return true;
  };

  const onSubmit = () => { 
    /**This function pretty much checks if a product 
  is being updated or created when the form is being created*/
    if (isUpdating) {//if this variable is true
      // update
      onUpdate(); //and this function returns true, then we know a product is being updated
    } else {
      onCreate();//otherwise this returns true, and we know a new product has been made
    }
  };

  const onCreate = async () => {// Function to check if it's a valide product creation form
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage(); //The path of the image that is being uploaded so that the app knows where to pull it from

    // Save in the database
    insertProduct( //reached if valid input
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {//Called when updating a products information
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage(); //getting the location of the image when updating to pull it

    updateProduct( //This function allows us to insert the product into the supabase backend. It updates the product's row
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => { //as the name would imply, this func is used to choose/upload product image
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //what type of media is allowed: images
      allowsEditing: true, //allows  the user to edit image after choosing
      aspect: [4, 3], //the aspect ratio of the image will be cropped to after the user chooses it
      quality: 1, //quality level of the image, 1 being the best and 0 the worst
    });

    if (!result.canceled) { //if not cancelled, the image will be set using its uri
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(id, { //specifies the product/id to remove from supabase using a hook
      onSuccess: () => {
        resetFields();
        router.replace('/(admin)'); //takes you back to front page of admin section after product deletion
      },
    });
  };

  const confirmDelete = () => { //This function is used for the confirm delete button
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      { //When the button is pressed your are asked to be sure if you want to delete the product
        text: 'Cancel', //text is what the user will see to know what to press
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete, //On press of delete, the product is deleted
      },
    ]);
  };

  const uploadImage = async () => { //The uploading of the image
    if (!image?.startsWith('file://')) { //this is checking if the image is a uri
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} //displays at the top of the screen to denote whether or not the product is updating
      />

      <Image
        source={{ uri: image || defaultPizzaImage }} //displays a products image, or the fallback of a pizza
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}> {/** this turns the text into a button that takes you to the prompt to choose a product image */}
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text> {/** the name and price labels appear above their respective input sections*/}
      <TextInput
        value={name} //name of product
        onChangeText={setName} //This changes the default text to whatever the user input
        placeholder="Name" //placeholder is greyed out text that appears in the input section to provide the user with an example and directions
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: 'red' }}>{errors}</Text>
      {/**The button below calls the onsubmit function to check if a product has been updated or created */}
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} /> 
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}> {/** A button used to confirm deletion of a product */}
          Delete
        </Text>
      )}
    </View>
  );
};

//This section is for stylization of the product creating screen
export default CreateProductScreen;
const styles = StyleSheet.create({
  container: { //the boxes that appears around the input boxes, images, text, etc...
    flex: 1, // how much the container can warp
    justifyContent: 'center', //content placing
    padding: 10, //space/margin around containers
  },
  image: { //image appearance and placement on screen
    width: '50%', // percent of the width of the container it will take up
    aspectRatio: 1, //1:1 aspect ration
    alignSelf: 'center', //placing
  },
  textButton: { //the buttons that are pressable like "upload image"
    alignSelf: 'center', //placement on screen
    fontWeight: 'bold', 
    color: Colors.light.tint,
    marginVertical: 10, //distance from top
  },

  input: { //This is how the input boxes look. Boxes like the price and name 
    backgroundColor: 'white',
    padding: 10, //the space/margin around the button
    borderRadius: 5, //how the box curves. The degree value
    marginTop: 5, //spacing from top
    marginBottom: 20, //spacing from botton
  },
  label: { //label text color and size
    color: 'gray',
    fontSize: 16,
  },
});
