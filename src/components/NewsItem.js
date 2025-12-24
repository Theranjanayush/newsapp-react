import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {

        let { title, description, imageUrl, newsUrl, pageSize, author, date, source } = this.props;
        return (
            <div>
                <div className="card my-3" style={{ width: "25rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"style ={{left:"90%",zIndex:"1"}}>
                            {source}
                        </span>
                    <div className="card-body">
                        
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <div className="class-text d-flex justify-content-around my-1 mb-0">
                            <p className="updated time mb-0"><small className="text-muted">Updated on {new Date(date).toGMTString()}. By {!author ? "Unknown" : author}</small></p>
                            {/* <p className="author mb-0"><small className="text-muted">{!author?"Unknown":author}</small></p> */}
                        </div>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary bg-dark my-1">Read More</a>

                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
