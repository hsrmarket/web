 'use strict';

class Book {

    constructor(_id, bookname, IBANNumber, autor){
        this.setId(_id);
        this.bookname = bookname;
        this.IBANNumber = ibanNumber;
        this.autor = autor;
    }

    setId(_id){
        if(!_id){
            this._id = undefined;
        }else{
            this._id = _id;
        }
    }

}