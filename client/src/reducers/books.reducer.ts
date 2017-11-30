import { Action } from 'redux'
import { Book, RootState } from '../models'


export function booksReduce(state: RootState , action: Action<any> ): Array<Book> {
  return [
    { id: 1, title: 'Javascript Book', pages: 30},
    { id: 2, title: 'Harry Potter', pages: 300},
    { id: 3, title: 'Ruby the book', pages: 4},
    { id: 4, title: 'Bible 2', pages: 100}
  ];


}
