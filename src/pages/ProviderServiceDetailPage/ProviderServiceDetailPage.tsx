import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Service} from "../../models/Service";
import axios from "axios";
import config from "../../config";

const ProviderServiceDetailPage = () => {

  const {id} = useParams();
  const [service, setService] = useState<Service>();
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [serviceError, setServiceError] = useState<boolean>(false);

  useEffect(() => {
    console.log("Received Service ID: " + id)
    axios.get(`${config.apiUrl}/services/${id}`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          const service: Service = response.data
          setService(service);
          setServiceLoaded(true);
          console.log(service);
        }
      ).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  }, []);

  if (serviceError) {
    return (
      <div>
        <h1>ProviderServiceDetail</h1>
        <p>Service not found</p>
      </div>
    );
  }

  return (
    <div>
      <h1>ProviderServiceDetail</h1>
      <p>id: {id}</p>
    </div>
  );
}

export default ProviderServiceDetailPage;
