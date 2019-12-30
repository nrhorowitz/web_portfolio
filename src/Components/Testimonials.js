import React, { Component } from 'react';
import Album from './Album.js';
import firebase from '../Components/Firebase';

class Testimonials extends Component {
   constructor(props) {
      super(props);
      this.state = {

      }
   }

   componentWillMount() {
      const imagesRef = firebase.storage().ref();
      // Find all the prefixes and items.
      imagesRef.listAll().then((res) => {
        res.prefixes.forEach((folderRef) => {
           console.log(folderRef)
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
           console.log(itemRef)
          // All the items under listRef.
        });
      }).catch((error) => {
         console.log(error)
        // Uh-oh, an error occurred!
      });
      console.log('log')
   }

   render() {
      return (
         <section id="testimonials">
            <div className="text-container">
               <div className="row">
                  <Album></Album>
               </div>
            </div>
         </section>
      );
   }
}

export default Testimonials;
