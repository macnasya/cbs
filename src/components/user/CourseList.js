import React from 'react';
import styles from '../styles'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { Text, Button, Icon } from 'native-base';
import { FlatList, View, TextInput } from 'react-native'
import { logout } from '../../actions'

class CourseList extends React.Component {

  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('courses')
    this.unsubscribe = null
    this.state = {
      courses: []
    }
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this)
    this.deleteCourse = this.deleteCourse.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onCollectionUpdate = (querySnapshot) => {
    const courses = []
    querySnapshot.forEach((doc) => {
      const { title, description } = doc.data()
      courses.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
      })
    })
    this.setState({ 
      courses,
      loading: false,
   })
  }

  addCourse () {
    this.ref.add({
      title: this.state.newCourse,
      description: 'Description',
    });
    this.setState({ 
      newCourse: '',
    })
  }

  deleteCourse (id) {
    this.ref.doc(id).delete()
  }

  render() {
    return (
      <View>
          <Text>Courses</Text>
          <FlatList
            data={this.state.courses}
            renderItem={({ item }) => 
              <View style={styles.rowLayout}>
                <Text>{item.title}</Text>
                <Button icon transparent danger onPress={() => this.deleteCourse(item.doc.id)}><Icon name="remove-circle"/></Button>
              </View>
            }
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(newCourse) => this.setState({newCourse})}
            value={this.state.newCourse}
            placeholder="Enter course name"
          />
          <Button onPress={this.addCourse.bind(this)}><Text>Add</Text></Button>
      </View>
    );
  }

}

export default connect(({user}) => ({user}), {logout})(CourseList)