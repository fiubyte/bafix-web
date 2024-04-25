import {useParams} from "react-router-dom";

const ProviderServiceDetail = () => {

  const { id } = useParams();

  return (
    <div>
      <h1>ProviderServiceDetail</h1>
      <p>id: {id}</p>
    </div>
  );
}

export default ProviderServiceDetail;
