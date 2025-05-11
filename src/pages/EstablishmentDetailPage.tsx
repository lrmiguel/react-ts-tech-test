import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { EstablishmentDetailType, getEstablishmentById } from "../api/ratingsAPI";
import { useQuery } from "react-query";
import styles from "./EstablishmentDetailPage.module.css";

const EstablishmentDetailPage = () => {
    const [error, setError] =
        useState<{ message: string; [key: string]: string }>();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const { data, isLoading } = useQuery<EstablishmentDetailType, Error>(
        ["establishment", id],
        async () => {
            try {
                return await getEstablishmentById(id);
            } catch (error) {
                throw new Error("Failed to fetch establishment details. Please try again later.");
            }
        },
        {
          keepPreviousData: true,
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000,
          cacheTime: 10 * 60 * 1000,
          onError: (error) => {
            setError({ message: error.message });
          }
        }
    );
    const establishment = data;

    if (isLoading) {
        return <div className={`${styles.layoutStyle} ${styles.loading}`}>
            <strong>Loading...</strong>
        </div>;
    }
    if (error) {
        return <div className={styles.layoutStyle}>Error: {error?.message}</div>; 
    }

    const formatUKAddress = (establishment: EstablishmentDetailType) => {
        const lines = [
          establishment.AddressLine1,
          establishment.AddressLine2,
          establishment.AddressLine3,
          establishment.AddressLine4,
        ].filter(Boolean);
      
        return (lines.length > 0)? lines.join(", ") : "N/A";
    }

    const formatDate = (date: string) => {
        const utcDate = new Date(date);
        return utcDate.toLocaleDateString("en-GB");
    }

    return (!isLoading &&
        (
            <div className={styles.layoutStyle}>
                {!!error && <div>{error}</div>}
                <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Establishment Details</h2>
                <div style={{ flexGrow: 1 }}>
                    <h3>{establishment?.BusinessName}</h3>
                    <p><strong>Address:</strong> {formatUKAddress(establishment!)}</p>
                    <p><strong>Rating:</strong> {establishment?.RatingValue}</p>
                    <p><strong>Date of Inspection:</strong> {formatDate(establishment!.RatingDate)}</p>
                </div>
                <div style={{textAlign: "center"}}>
                    <button className={styles.buttonStyle} onClick={() => history.push("/")}>Go back</button>
                </div>
            </div>
        )
    );
};
export default EstablishmentDetailPage;