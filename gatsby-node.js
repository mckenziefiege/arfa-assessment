const path = require('path');

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;
  return new Promise((resolve, reject) => {
    const articleTemplate = path.resolve('src/templates/article-template.js');
    resolve(
      graphql(`
        {
          allContentfulStory (limit:100) {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulStory.edges.forEach((edge) => {
          createPage({
            path: edge.node.slug,
            component: articleTemplate,
            context: {
              slug: edge.node.slug
            }
          });
        });
        return
      })
    );
  });
};
