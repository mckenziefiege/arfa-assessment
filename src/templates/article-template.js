import React, { Component} from 'react';

import BackButton from '../components/backButton.js';
import RelatedArticle from '../components/relatedArticle.js';

import { graphql } from 'gatsby';

class ArticleTemplate extends Component {


  state = {
    likes: 0
  }

  componentDidMount() {
    const windowGlobal = typeof window !== 'undefined' && window

    this.setState({
      likes: parseInt(windowGlobal.localStorage.getItem(this.props.data.contentfulStory.slug))
    })
  }

  likeArticle = () => {
    let num = parseInt(window.localStorage.getItem(this.props.data.contentfulStory.slug))
    window.localStorage.setItem(this.props.data.contentfulStory.slug, num + 1)
    this.setState({
      likes: num + 1
    })
  }

  render () {
    const {
      title,
      relatedContent,
      slug,
      childContentfulStoryBodyTextNode,
      heroImage,
      author
    } = this.props.data.contentfulStory;

    let related = relatedContent ? relatedContent.map(obj => <RelatedArticle key={obj.id} article={obj}/>) : "No Related Content"

    return (
      <div className="chosen-article">
        <BackButton />
        <h1 className="chosen-article__title">{title}</h1>
        <p className="chosen-article__author">by {author.name}</p>
        <div className="chosen-article__likes-container">
          <p className="chosen-article__likes">{window.localStorage.getItem(slug)}</p>
          <svg aria-hidden="true" data-prefix="far" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
          <button className="chosen-article__button" onClick={this.likeArticle}>like article</button>
        </div>
        <img className="chosen-article__image" alt={title} src={heroImage.file.url} />
        <article>
          <div className="chosen-article__content" dangerouslySetInnerHTML={{ __html: childContentfulStoryBodyTextNode.childMarkdownRemark.html }} />
        </article>

        <div className="chosen-article__related-content">
          <p>You Might Also Like</p>
          {related}
        </div>
      </div>
    );
  }
}

export default ArticleTemplate;

export const pageQuery = graphql`
  query articleQuery($slug: String!){
    contentfulStory(slug: {eq: $slug}) {
      childContentfulStoryBodyTextNode {
      childMarkdownRemark {
        html
      }
    }
    title
     subtitle
     slug
     heroImage {
       file {
         url
       }
     }
       author {
       name
       company
     }
     relatedContent {
        id
				title
        slug
        author {
					name
        }
      }
    }
  }
`;
