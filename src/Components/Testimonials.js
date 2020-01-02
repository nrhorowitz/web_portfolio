import React, { Component } from 'react';
import Album from './Album.js';
import Loading from './Loading';

var keys = ['food', 'nature', 'object', 'urban'];
class Testimonials extends Component {
   constructor(props) {
      super(props);
      this.state = {
         imageHeaderData: [],
      }
      this.renderReady = this.renderReady.bind(this);
      this.resolveEvent = this.resolveEvent.bind(this);
   }

   renderReady() {
      for (var i = 0; i < keys.length; i += 1) {
         if (!this.props.data('images', keys[i])) {
            return false;
         }
      }
      return true;
   }

   resolveEvent(type, var1=false) {
      if (type === "MouseEnter") {
         console.log("enter", var1);
      } else if (type === "MouseExit") {
         console.log("exit", var1)
      }
   }

   render() {
      if (this.renderReady()) {
         return (
            <section id="testimonials">
               <div className="text-container">
                  <div className="row">
                     <Album 
                        keys={keys}
                        data={this.props.data}
                        resolveEvent={this.resolveEvent}
                     />
                  </div>
               </div>
            </section>
         );
      } else {
         return (
            <Loading/>
         )
      }
   }
}

export default Testimonials;
