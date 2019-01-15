import React from 'react';
import { Icon } from 'react-native-elements';
import{
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    ScrollView,
    TouchableOpacity,
    AsyncStorage 
} from 'react-native';
import Note from './Note';
import Prompt from 'react-native-prompt';
export default class Main extends React.Component{
    
constructor(props){
    console.log('page opened');
    super(props);
    this.state={
        noteArray: [],
        noteText: '',
        updateNoteText: '',
        promptVisible: false,
        setIndex: ''
    }
}


componentWillMount(){
    AsyncStorage.getItem('NOTES').then((val) => {
        if(val !== null){
            this.setState({noteArray: JSON.parse(val)});
            console.log(val);
        }else{
            console.log(val);
        }
        console.log(val);
    }).catch((err) => {
        console.log(err);
    })
}

componentWillUnmount() {
    AsyncStorage.setItem('NOTES', JSON.stringify(this.state.noteArray)).then((val) => {      
        // setTimeout(() => {
        //     console.log(val);
        // }, 1000);
    }).catch((err) => {
        console.log(err);
    })
}



    render(){
      
        let notes= this.state.noteArray.map((val,key) => {
            return <Note key={key} keyval={key} val={val}
            deleteMethod= {()=> this.deleteNote(key)}
            editMethod= {()=>this.editNote(key)}/>
        });

       
        return (
        <View style={styles.container}>
        <Prompt
            title="update note"
            placeholder="Enter new note"
            defaultValue={this.state.updateNoteText}
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
            promptVisible: false,
            noteText: ''
            }) }
            onSubmit={ (value) => {
                let d = new Date();
                this.state.noteArray[this.state.setIndex].note = value;
                this.state.noteArray[this.state.setIndex].date = d.getFullYear() +  "/" + (d.getMonth()) + "/" + d.getDate();
                this.setState({promptVisible: false, noteText: ''});
                //console.log(index);
                console.log(value)
            } }
        />
            <View style={styles.header}>
              <Text style={styles.headerText} >-Notes- </Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
            {notes}
            </ScrollView>

            <View style={styles.footer}>
             <TextInput
              style={styles.TextInput}
              onChangeText={(noteText)=>this.setState({noteText})}
              value={this.state.noteText}
              placeholder='Enter your note !'
              placeholderTextColor='white'
             /*underlineColorAndroid='white'*/ >
             </TextInput>
            </View>

            <TouchableOpacity  onPress={this.addnote.bind(this)} style={styles.addButton}>
               {/* <Icon name='note-add' color='white'/> */}
               <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
        );
    }
    addnote(){
        if(this.state.noteText){
           // alert(this.state.noteText);
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                "/" + (d.getMonth()+1) + "/" +
                d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''})
          
        }

    }
    deleteNote(key){
        Alert.alert(
            'Delete note:',
            'Are you sure ?',
            [
            //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                this.state.noteArray.splice(key,1);
                this.setState({noteArray: this.state.noteArray})
              }},
            ],
            { cancelable: false }
          )





      
    }
    editNote(key){
        let data = this.state.noteArray[key];
        console.log(data);
        this.setState({promptVisible: true, updateNoteText: data.note, setIndex: key})
        console.log(key);
        console.log('Edit Called');
    }
}
const styles = StyleSheet.create({
    container: {
         flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems : 'center',
        justifyContent : 'center',
        borderBottomWidth: 5,
        backgroundColor: 'black',
    },
    headerText:{
        color:'#eee',
        fontSize: 18,
        padding:26,
    },
    footer:{
        position:'absolute',
        bottom:0,
        color:'black',
        left:0,
        right:0,
        zIndex:10,
    },
    scrollContainer:{
        flex:1,
        marginBottom:100,
    },
    TextInput:{
        alignSelf:'stretch',
        color:'white',
        fontSize:20,
        padding:20,
        backgroundColor:'black',
        borderTopWidth: 2,
        borderTopColor:'#ededed',
    },
    addButton:{
        position:'absolute',
        // zIndex:31,
        right:20,
        bottom: 90,
        backgroundColor:'black',
        width :70,
        height:70,
        borderRadius: 70,
        alignItems:'center',
        justifyContent:'center',
        elevation:20,
        // fontSize:200,
    },
    addButtonText:{
        color:'white',
        fontSize:30,
    },
    

 
});