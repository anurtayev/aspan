import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MetaData } from "aspanUtils";

export default ({ id, metaData }: { id: string; metaData?: MetaData }) => {
  const SAVE_METADATA = gql`
    mutation setMetaData {
      setMetaData(
        id: "${id}"
        metaData: ${metaData}
      ) {
        title
        description
        tags
        attributes
      }
    }
  `;

  return useQuery(SAVE_METADATA);
};
