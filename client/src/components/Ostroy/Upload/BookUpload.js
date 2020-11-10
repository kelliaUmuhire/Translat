import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { uploadBook } from '../../../store/actions/booksAction'

class BookUpload extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            book: '',
            bookCover: '',
            title: '',
            author: ''
        }
    }

    onFileChange(e) {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('book', this.state.book)

        const coverData = new FormData()
        coverData.append('bookCover', this.state.bookCover)

        const details = {
            title: this.state.title,
            author: this.state.author,
            uploaded: "true"
        }

        this.props.sendBook(formData, coverData, details);
        // axios.post("api/books/uploadbook", formData, {
        // }).then(res => {
        //     console.log(res)
        //     axios.post("api/books/uploadbook", coverData, {
        //     }).then(res => {
        //         console.log(res)
        //         axios.post('api/books/addDetails', details)
        //             .then(res => {
        //                 this.props.book = res.data
        //             })
        //             .catch(err => console.log(err))
        //     })
        // })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{ paddingTop: '1rem' }}>
                        <div className="col-sm-12">
                            <label>Book</label>
                            <input type="file" className="form-control" name="book" onChange={this.onFileChange}/>
                        </div>
                    </div>
                    <div className="form-group" style={{ paddingTop: '1rem'}}>
                        <div className="col-sm-12">
                            <label>Book Cover</label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Upload Book Cover"
                              name="bookCover"
                              onChange={this.onFileChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ paddingTop: '1rem' }}>
                        <div className="col-sm-12">
                            <input
                              type="text"FilesUpload
                              className="form-control"
                              placeholder="Title/Name of the book"
                              name="title"
                              onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ paddingTop: '1rem' }}>
                        <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Author"
                              name="author"
                              onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-6 mt-2">
                            <input
                             type="submit"
                             value="Upload"
                             className="form-control btn btn-warning pt-2 rounded"
                             style={{ marginLeft: '5rem' }}
                            />
                        </div>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    books : state.books.books
})

const mapDispatchToProps = dispatch => ({
    sendBook: (formData, coverData, details) => dispatch(uploadBook(formData, coverData, details))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookUpload));