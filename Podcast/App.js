import * as React from 'react';
import {useState, useEffect} from 'react';
import { Button, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';
import Constants from 'expo-constants';

import CreateSimpleHelp from './components/CreateSimpleHelp'
import CreateRegularHelp from './components/CreateRegularHelp';
import CreateDonationButton from './components/CreateDonationButton';
import UploadPicCover from './components/UploadPicCover';
import DismissOverlay from './components/DismissOverlay';
import NextButton from './components/NextButton';
import PostFooter from './components/PostFooter';

//select
import {Picker} from '@react-native-community/picker';
import RNPickerSelect from 'react-native-picker-select';

import Svg, {
  Path,
} from 'react-native-svg';
import HelpOutlineButton from './components/HelpOutlineButton';
import AddPodcastScreen from './screens/AddPodcastScreen';
import SnippetScreen from './screens/SnippetScreen';

function MyImagePicker(props) {
  const [picSource, setPicSource] = useState(null);
  const options = {
    title: 'Выбрать обложку',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pick = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //const source = 'data:image/jpeg;base64,' + response.data;
        const source = { uri: response.uri };
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //console.log('source = ', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setPicSource(source);
        //send to root class
        props.updatePicSource(source);
      }
    });
  };
  if (picSource == null) {
    return (
        <View style={{paddingVertical:20, paddingHorizontal:20, width:"100%", height:200}}>
  <TouchableOpacity
    style={styles.button}
    onPress={pick}
        >
        <UploadPicCover />
        </TouchableOpacity>
        </View>
  );
  } else {
    return (
        <View style={{paddingVertical:20, paddingHorizontal:20, width:"100%", height:200}}>
  <Image resizeMode="cover" source={picSource} style={{borderRadius:10,width:"100%", height:"100%"}} />
    <View style={{position:"absolute", top:30, right:30}}>
  <TouchableOpacity
    onPress={() => {setPicSource(null)}}
  >
  <DismissOverlay />
    </TouchableOpacity>
    </View>
    </View>
  );
  }
}

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
  <Button
  title="Go to Details"
  onPress={() => navigation.navigate('Details')}
  />
  </View>
);
}

function Donations({ navigation }) {
  return (
      <View style={styles.donationsScreen}>
      <Text>У Вас пока нет сборов.</Text>
  <Text>Начниете доброе дело.</Text>
  <Text></Text>
  <TouchableOpacity
  style={styles.createDonationButton}
  onPress={() => navigation.navigate('DonationType')}
>
<CreateDonationButton />
  </TouchableOpacity>
  </View>
);
}

function DonationType({ navigation }) {
  return (
      <View style={styles.donationTypeScreen}>
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('TargetDonation')}
>
<CreateSimpleHelp />
  </TouchableOpacity>
  <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('RegularDonation')}
>
<CreateRegularHelp />
  </TouchableOpacity>



  </View>
);
}

class TargetDonation extends React.Component<props> {
  state = {
    donationName: '',
    author: 'user',
    picSource: null,
    description:''
  };
  updatePicSource = (newSource) => {
    this.setState({picSource: newSource});
  };
  render() {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}} keyboardVerticalOffset={150}>
        <MyImagePicker updatePicSource={this.updatePicSource} />
    <Text style={styles.textInputDescription} >
        Название сбора
    </Text>
    <TextInput
    style={styles.textInput}
    placeholder="Название сбора"
    onChangeText={((value)=> this.setState({donationName:value}))}
    />
    <Text style={styles.textInputDescription} >
        Сумма, ₽
  </Text>
    <TextInput
    style={styles.textInput}
    placeholder="Сколько нужно собрать?"
    keyboardType='numeric'
        />
        <Text style={styles.textInputDescription}>
        Цель
        </Text>
        <TextInput

    style={styles.textInput}
    placeholder="Например, лечение человека"
        />
        <Text style={styles.textInputDescription} >
        Описание
        </Text>
        <TextInput
    multiline={true}
    numberOfLines={2}
    style={{...styles.textInput, height: 70, paddingTop:10}}
    placeholder="На что пойдут деньги и как они кому-то помогут?"
    onChangeText={((value)=> this.setState({description:value}))}
    />
    <Text style={styles.textInputDescription} >
        Куда получать деньги?
  </Text>
    <TextInput
    style={styles.textInput}
    value="Счет VK Pay · 1234"
        />
        <TouchableOpacity
    style={{...styles.button, marginBottom:40}}
    onPress={() => this.props.navigation.navigate('Feed', {author: "Андрей Иванов", donationName: this.state.donationName, picSource: this.state.picSource, description: this.state.description, typehelp:'Целевой'})}
  >
  <NextButton />
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
  }
}

class RegularDonation extends React.Component<props> {
  state = {
    donationName: '',
    author: 'user',
    picSource: null,
    description:''
  };

  updatePicSource = (newSource) => {
    this.setState({picSource: newSource});
  };

  render() {
    return (


        <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
  <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}
    keyboardVerticalOffset={150}>
        <MyImagePicker updatePicSource={this.updatePicSource} />
    <Text style={styles.textInputDescription}>
        Название сбора</Text>
    <TextInput
    style={styles.textInput}
    placeholder="Название сбора"
    onChangeText={((value)=> this.setState({donationName:value}))}
    />
    <Text style={styles.textInputDescription}>
        Сумма, ₽
  </Text>
    <TextInput
    style={styles.textInput}
    placeholder="Сколько нужно в месяц?"
    keyboardType='numeric'
        />
        <Text style={styles.textInputDescription}>
        Цель
        </Text>
        <TextInput
    ref={ref => this.textInputRef = ref}
    //onFocus={()=>{
    //console.log(this.textInputRef);
    //this.textInputRef && this.textInputRef.scrollTo()}}
    style={styles.textInput}
    placeholder="Например, поддержка приюта"
        />
        <Text style={styles.textInputDescription}>
        Описание
        </Text>
        <TextInput
    multiline={true}
    numberOfLines={2}
    style={{...styles.textInput, height: 70, paddingTop:10}}
    placeholder="На что пойдут деньги и как они кому-то помогут?"
    onChangeText={((value)=> this.setState({description:value}))}
    />
    <Text style={styles.textInputDescription}>
        Куда получать деньги?
  </Text>
    <TextInput
    style={styles.textInput}
    value="Счет VK Pay · 1234"
        />
        <Text style={styles.textInputDescription}>
        Автор
        </Text>
        <RNPickerSelect
    style={pickerSelectStyles}

    useNativeAndroidPickerStyle={false}
    placeholder={{
      label: 'Выберите автора',
          value: null,
          color: '#9EA0A4'
    }}
    items={[
          {label: 'Андрей Иванов', value: 'Андрей Иванов'},
    {label: 'Фонд поддержки сурикатов', value: 'Фонд поддержки сурикатов'},
    {label: 'Фонд ремонта Молнии МакКвина', value: 'Фонд ремонта Молнии МакКвина'},
  ]}
    onValueChange={value => {
      this.setState({
        author: value,
      });
    }}
    value={this.state.author}
    Icon={() => {
      return <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
          <Path
      d="M12 14.1983L6.64021 9.7318C6.21593 9.37824 5.58537 9.43556 5.2318 9.85984C4.87824 10.2841 4.93556 10.9147 5.35984 11.2682L11.3598 16.2682C11.7307 16.5773 12.2694 16.5773 12.6402 16.2682L18.6402 11.2682C19.0645 10.9147 19.1218 10.2841 18.7682 9.85984C18.4147 9.43556 17.7841 9.37824 17.3598 9.7318L12 14.1983Z"
      fill="#B8C1CC"/>
          </Svg>

    }}
    />
    <TouchableOpacity
    style={{...styles.button, marginBottom:40}}
    onPress={() => this.props.navigation.navigate('Feed', {author: this.state.author, donationName: this.state.donationName, picSource: this.state.picSource, description: this.state.description, typehelp:'Регулярный'})}
  >
  <NextButton />
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>

  );
  }
}

function DetailsScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Details Screen</Text>
  <Button
  title="Go to Details... again"
  onPress={() => navigation.push('Details')}
  />
  <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  <Button title="Go back" onPress={() => navigation.goBack()} />
  <Button
  title="Go back to first screen in stack"
  onPress={() => navigation.popToTop()}
  />
  </View>
);
}

function Feed({route, navigation }) {
  const { author } = route.params;
  const { donationName } = route.params;
  const { picSource } = route.params;
  const { description } = route.params;
  const { typehelp } = route.params;

  return (
      <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
<View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft:'5.5%', marginRight:'5.5%'}}>


<View style={{backgroundColor:'black', width:"100%", height:"20%", borderRadius:10}}>
<Image source={picSource} style={{width:"100%", height:"100%", borderTopLeftRadius:10, borderTopRightRadius:10}} />
  </View>
  <View style={{marginTop:'3%'}}>
<Text style={
  {
    "marginLeft": '1%',
      "fontStyle": "normal",
      "fontWeight": "600",
      "fontSize": 15,
      "lineHeight": 20,
      "letterSpacing": -0.24,
      "color": "#000000"
  }
}>{donationName}</Text>
  <Text style={
  {
    "marginLeft": '1%',
      "fontStyle": "normal",
      "fontWeight": "normal",
      "fontSize": 13,
      "lineHeight": 16,
      "letterSpacing": -0.078,
      "color": "#818C99"
  }
}>{author}</Text>
  </View>
  <View style={{flexDirection:'row', alignItems:'space-between', marginLeft:'1%', marginTop:'3%'}}>
<View style={{width:"80%", flex: 1}}>
<Text style={
  {
    flex: 2,
        "fontStyle": "normal",
      "fontWeight": "normal",
      "fontSize": 13,
      "lineHeight": 16,
      "letterSpacing": -0.078
  }
}>Собрано в сентябре 8750р</Text>

  <View style={{width:"90%", flex: 1,  backgroundColor:"#3F8AE0", opacity:0.3, borderRadius:2}}>
</View>
  <View style={{width:"70%", flex:1, backgroundColor:"#3F8AE0", borderRadius:2, position:'absolute', bottom:1, height:"29%"}}>
</View>
  </View>
  <View>
  <TouchableOpacity

  onPress={() => navigation.navigate('BigMock', {picSource: picSource, donationName: donationName, author: author, description:description, typehelp:typehelp})}
>
<HelpOutlineButton />
  </TouchableOpacity>
  </View>
  </View>

  </View>
  </View>

);
}

function BigMock({ route, navigation }) {
  const { author } = route.params;
  const { donationName } = route.params;
  const { picSource } = route.params;
  const { description } = route.params;
  const { typehelp } = route.params;
  return (
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
<ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}
  keyboardVerticalOffset={150}>
      <View style={{ width:"100%", height:160}}>
<Image resizeMode="cover" source={picSource} style={{width:"100%", height:"100%"}} />
  </View>
  <View style={{paddingTop:20, paddingLeft:10}}>
<Text style={styles.textTitle}>{donationName}</Text>
      <Text style={styles.textAuthor}>Автор {author}</Text>
  <Text style={styles.textType}>{typehelp}</Text>
      <Text >{description}</Text>
      </View>
      <View>
      <PostFooter/>
      </View>

      </KeyboardAvoidingView>
      </ScrollView>
      </SafeAreaView>
);
}

const Stack = createStackNavigator();

// function App() {
//   return (
//       <NavigationContainer>
//       <Stack.Navigator initialRouteName="Donations" screenOptions={{
//     headerBackTitleVisible: false}}>
// <Stack.Screen name="Donations" options={{title:"Пожертвования"}} component={Donations} />
//   <Stack.Screen name="DonationType" options={{title:"Тип сбора"}} component={DonationType} />
//   <Stack.Screen name="TargetDonation" options={{title:"Целевой сбор"}} component={TargetDonation} />
//   <Stack.Screen name="RegularDonation" options={{title:"Регулярный сбор"}} component={RegularDonation}/>
//   <Stack.Screen name="Feed" options={{title:"Лента"}} component={Feed} />
//   <Stack.Screen name="BigMock" options={{headerShown:false}} component={BigMock}/>
//   </Stack.Navigator>
//   </NavigationContainer>
// );
// }

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AddPodcastScreen">
            <Stack.Screen name="AddPodcastScreen" options={{title: "Новый подкаст"}} component={AddPodcastScreen} />
            <Stack.Screen name="SnippetScreen" options={{title: "Новый подкаст"}} component={SnippetScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //marginTop: Constants.statusBarHeight,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  donationTypeScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
  },
  donationsScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: '5.5%',
    "backgroundColor": "#F2F3F5",
    "borderWidth": 0.5,
    "borderColor": "rgba(0, 0, 0, 0.12)",
    "borderStyle": "solid",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "width": '89%',
    "height": 40,
    "paddingLeft": 15,
    marginBottom: 30,

  },
  textInputDescription:{
    alignSelf:'flex-start',
    marginLeft: '5.5%',
    marginBottom: 8,
    color:'#6D7885',
    //"fontFamily": "SF Pro Text",
    "fontStyle": "normal",
    "fontWeight": "normal",
    "fontSize": 14,
    "lineHeight": 18,
    "letterSpacing": -0.154,
  },
  textTitle: {
    //"fontFamily": "SF Pro Display",
    "fontStyle": "normal",
    "fontWeight": "bold",
    "fontSize": 24,
    "lineHeight": 28,
    "letterSpacing": 0.326451
  },
  textAuthor: {
    "fontStyle": "normal",
    "fontWeight": "500",
    "fontSize": 14,
    "lineHeight": 18,
    "letterSpacing": -0.154,
    "color": "#6D7885"
  },
  textType: {
    "fontStyle": "normal",
    "fontWeight": "normal",
    "fontSize": 13,
    "lineHeight": 16,
    "letterSpacing": -0.078,
    "color": "#818C99"
  },
  createDonationButton: {
    backgroundColor: "#4986CC",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    padding: 0
  },
  uploadPic: {
    backgroundColor: "#DDDDDD",
    //justifyContent: "center",
    alignSelf: "flex-start",
    display: "flex",
//        width: "90%",
    //      height: "20%",
    margin: 10,
    resizeMode: "cover",
  },
  canvas: {
    flex: 1
    //  position: 'absolute',
    //  top: 0,
    //  left: 0,
    //  bottom: 0,
    //  right: 0,
  },
  canvContainer: {
    flex: 1,
    alignItems: 'stretch',
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    //position: 'relative'
  },
  scrollView: {
    backgroundColor: '#ffffff',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: '5.5%',
    "backgroundColor": "#F2F3F5",
    "borderWidth": 0.5,
    "borderColor": "rgba(0, 0, 0, 0.12)",
    "borderStyle": "solid",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "width": '88%',
    "height": 40,
    "paddingLeft": 15,
    marginBottom: 30,
    paddingRight: 30, // to ensure the text is never behind the icon

  },
  inputAndroid: {
    marginLeft: '5.5%',
    "backgroundColor": "#F2F3F5",
    "borderWidth": 0.5,
    "borderColor": "rgba(0, 0, 0, 0.12)",
    "borderStyle": "solid",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "width": '88%',
    "height": 40,
    "paddingLeft": 15,
    marginBottom: 30,
    paddingRight: 30, // to ensure the text is never behind the icon,
    color: 'black'
  },
  iconContainer: {
    top: 8,
    right: 34,
  }
});

export default App;
