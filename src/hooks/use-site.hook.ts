import { useStaticQuery, graphql } from 'gatsby';

export function useSite() {
    const { site } = useStaticQuery(graphql`
        query GetSiteMetadata{
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
        }
    `);

    return site;
}