const gql = require('graphql-tag');

module.exports = gql`
fragment TPSCompanyPageFragment on Content {
  id
  name
  siteContext {
    path
    canonicalUrl
  }
  websiteSchedules {
    section {
      id
      alias
      name
      fullName
      site {
        id
      }
      hierarchy {
        id
        alias
        site {
          id
        }
      }
    }
  }
  primaryImage {
    id
    src(input: { useCropRectangle: true, options: { auto: "format,compress" } })
    cropRectangle {
      width
      height
    }
    alt
    caption
    credit
    isLogo
    cropDimensions {
      aspectRatio
    }
    primaryImageDisplay
  }
  primarySection {
    id
    name
    alias
    canonicalPath
    hierarchy {
      id
      name
      alias
      canonicalPath
    }
  }
  ... on Addressable {
    address1
    address2
    cityStateZip
    country
  }
  ... on Contactable {
    phone
    tollfree
    fax
    website
    title
    mobile
    publicEmail
  }
  ... on ContentCompany {
    email
  }
  ... on SocialLinkable {
    socialLinks {
      provider
      url
      label
    }
  }
}
`;
