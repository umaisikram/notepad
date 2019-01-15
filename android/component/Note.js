import React from 'react';
import { Icon } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
export default class Note extends React.Component{
    render(){
        return( 
            <View key={this.props.keyval} style={styles.design}>
                <Text style={styles.index}>{this.props.keyval+1} </Text>
                
                        
                        
                    
                            <View style={styles.note}>
                            <View style={styles.border}></View>
                            <View>
                            <Text style={styles.date}> {this.props.val.date}  </Text>
                            <Text style={styles.NoteText}> {this.props.val.note}  </Text>
                            </View>
                            </View>
                    
                        
                        
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                        {/* <Text style={styles.noteDeleteText}>del</Text> */}
                        <Icon name='delete' color='white'/>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
                        {/* <Text style={styles.noteDeleteText}>edit</Text> */}
                        <Icon name='edit' color='white'/>
                    </TouchableOpacity>
                </View>
            </View>
        

        );
    }
}

            const styles= StyleSheet.create({
                design:{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent:'space-around'
                },
                index:{
                    position:'relative',
                    padding: 20,
                    fontSize: 20, 

                },
                note:{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent:'flex-start',
                    padding:10,
                   
                    
                },
                date:{
                    position:'relative',
                    paddingLeft:20,
                    height:20,
                },

                NoteText:{
                    position:'relative',
                    paddingLeft:20,
                    fontSize : 16,
                },
                 border:{
                    
                    borderLeftWidth:10,
                    borderLeftColor:'#E91E63',
                    height: 45,
                
                },
                noteDeleteText:{
                    color:'white',
                },
                buttonsContainer:{
                    flexDirection: 'row',
                    height : 65,
                    justifyContent: 'space-evenly',
                },
                noteEdit:{
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 15,
                    margin: 5,
                },
                noteDelete:{
                    backgroundColor: '#2988b9',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 15,
                    margin: 5,
                },

            });