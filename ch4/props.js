import { props } from './utils.js';

class Bag {
  name = 'ihab'
  last = 'arnous'
  title = 'swe'

  fullname() {
    return `${this.title} ${this.name} ${this.last}`
  } 

}

console.log(props(...['fullname', 'title'])(new Bag()))