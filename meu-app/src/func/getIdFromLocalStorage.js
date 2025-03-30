import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function useIdFromLocalStorage(campoLocalStorage) {
    const navigate = useNavigate();

    const storedId = localStorage.getItem(campoLocalStorage);
    if (!storedId) {
        navigate(-1);
    }

    return storedId;
}