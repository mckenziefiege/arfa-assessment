import React, { Component} from 'react';

import Link from 'gatsby-link';

class RelatedArticle extends Component {
  render () {
    const { article } = this.props
    return (
      <div>
        <Link className="chosen-article__related-article" to={article.slug}>{article.title}</Link>
      </div>
    );
  }
}

export default RelatedArticle;
