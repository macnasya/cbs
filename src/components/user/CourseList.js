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
      .where('published', '==', true)
    this.unsubscribe = null
    this.state = {
      courses: []
    }
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
      const { title, description, roles, published } = doc.data()
      courses.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        published,
        roles
      })
    })
    this.setState({ 
      courses,
      loading: false,
   })
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
              </View>
            }
          />
      </View>
    );
  }

}

export default connect(({user}) => ({user}), {logout})(CourseList)