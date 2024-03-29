import { currentUser } from "../../components/navigation/menu";

const develop = "http://127.0.0.1:5000";
const prod = "https://multi-service-gkv32wdswa-ue.a.run.app";
const ifDev = false;

const formBody = (details: any) => {
  let formBody:any = [];
  for (let props in details) {
    let encodedKey = encodeURIComponent(props);
    let encodedVal = encodeURIComponent(details[props]);
    formBody.push(encodedKey + "=" + encodedVal);
  }
  formBody = formBody.join("&") as any;

  return formBody;
};

type business_data = {
  name: string,
  pictureURL: string,
  category: string,
  recyclingTypes: string,
  location: string,
  street: string,
  city: string,
  county: string,
  state: string,
  zipcode: string,
  phone: string;
  website: string,
  timeAvailability: string,
  lat: number,
  lng: number
}

export const createBusiness = async (businessEntry: business_data) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    data: JSON.stringify(businessEntry),
  } as any;

  const response = await fetch(`${ifDev ? develop : prod}/database/createBusinessEntry`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response.json();
};

export const updateBusiness = async (businessEntry: business_data) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    data: JSON.stringify(businessEntry),
  } as any;

  const response = await fetch(`${ifDev ? develop : prod}/database/updateBusinessEntry`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response.json();
};

export const deleteBusiness = async () => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token
  } as any;

  const response = await fetch(`${ifDev ? develop : prod}/database/deleteBusiness`, {
    method: "DELETE",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response.json();
};

export const getBusinessData = async (uid: any) => {
  let details = {
    uid: uid
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/getBusinessData`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};

export const queryBusinessIDs = async (lat: number, lng: number) => {
  let details = {
    latitude: lat,
    longitude: lng
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/queryBusiness`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};

export const getBusinessImages = async (uid: any) => {
  let details = {
    uid: uid
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/getBusinessImages`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};

function getBase64(file:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const addBusinessImage = async (imageID: any, file: File) => {
  const id_token = await currentUser().getIdToken();
  const base64 = await getBase64(file);
  let details = {
    id_token: id_token,
    image_id: imageID,
    image_base64: base64
  } as any;

  const response = await fetch(`${ifDev ? develop : prod}/database/addBusinessImage`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response;
}

export const deleteBusinessImage = async (ids: any[]) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    image_ids: ids
  } as any;

  const response = await fetch(`${ifDev ? develop : prod}/database/deleteBusinessImages`, {
    method: "DELETE",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response;
}

export const queryTrashCanLocations = async (lat: number, lng: number) => {
  let details = {
    latitude: lat,
    longitude: lng,
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/queryTrashcanLocation`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};

export const getTrashCanImage = async (ids: any[]) => {
  let details = {
    image_ids: ids,
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/getTrashcanImage`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};

export const getTrashCanData = async (ids: any[]) => {
  let details = {
    image_ids: ids,
  } as any;

  const data = await fetch(`${ifDev ? develop : prod}/database/getTrashcan`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return data.json();
};