import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
export class News extends Component {
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0


        }
    }
    async componentDidMount() {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        console.log(
            "PAGE 1 requested:", this.props.pageSize,
            "received:", parsedData.articles.length
        );

        this.setState(
            { articles: parsedData.articles || [], totalResults: parsedData.totalResults || 0 }
        )
    }
    handleNextClick = async () => {
        this.setState({ loading: true });
        console.log("next")
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)

        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
        }
        )

    }
    handlePrevClick = async () => {

        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState(
            {
                articles: parsedData.articles,
                page: this.state.page - 1,
                loading: false

            }
        )
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">Top Headlines</h1>
                {this.state.loading && <Spinner />}

                <div className='row my-5'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) + ".." : ""} description={element.description ? element.description.slice(0, 100) + ".." : ""} imageUrl={!element.urlToImage ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/CM4GX7WJ3Q43CYIKPVFMXPHYRI_size-normalized.jpg&w=1440" : element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                {!this.state.loading && (<div className='container d-flex justify-content-between '>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>)}
            </div>
        )
    }
}

export default News
