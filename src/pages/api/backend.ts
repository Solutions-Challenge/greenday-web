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

export const deletePic = async (image_id: string, authChange: boolean) => {
  if (authChange) {
    const id_token = await currentUser().getIdToken();

    let details = {
      id_token: id_token,
      image_id: image_id,
      meta_flag: "true",
    } as any;

    await fetch(`${ifDev ? develop : prod}/database/deleteImg`, {
      method: "DELETE",
      body: formBody(details),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  }
};

export const fetchCategoryData = async () => {
  const MLRequest = await fetch(`${ifDev ? develop : prod}/mapData`, {
    method: 'GET',
  })
  const MLdata = await MLRequest.json()
  return MLdata.success
}

export const predict = async (formBody: any) => {
  const MLRequest = await fetch(
    `${ifDev ? develop : prod}/predict`,
    {
      method: "POST",
      body: formBody,
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

  const MLdata = await MLRequest.json();
  return MLdata
};

export const getPic = async (image_id: string, authChange: boolean) => {
  if (authChange) {
    const id_token = await currentUser().getIdToken();

    let details = {
      id_token: id_token,
      image_id: image_id,
      meta_flag: "true",
    } as any;

    const data = await fetch(`${ifDev ? develop : prod}/database/getImg`, {
      method: "POST",
      body: formBody(details),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });

    let json = await data.json();

    if ("error" in json) {
      return "error";
    } else {
      let copy = {
        image: {
          uri: json.success.photo,
        },
        ...json.success["photo-meta"],
      };

      return copy;
    }
  }
};

export const getAllPics = async (authChange: boolean) => {
  if (authChange) {
    const id_token = await currentUser().getIdToken();

    let details = {
      id_token: id_token,
    } as any;

    const data = await fetch(`${ifDev ? develop : prod}/database/getImgKeys`, {
      method: "POST",
      body: formBody(details),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });

    const json = await data.json();

    return json;
  }
};

export const deleteUser = async () => {
  const id_token = await currentUser().getIdToken();

  let details = {
    id_token: id_token,
  } as any;

  await fetch(`${ifDev ? develop : prod}/database/deleteUser`, {
    method: "DELETE",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

function getBase64(file:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const addImg = async (data: any, result: any) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    data: JSON.stringify({
      key: id_token,
      multi: data,
    }),
    image_base64: await getBase64(result),
  } as any;

  console.log(details);

  await fetch(`${ifDev ? develop : prod}/database/addImg`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

export const addTrashImg = async (props: any) => {
  const id_token = await currentUser().getIdToken();
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let details = {
    id_token: id_token,
    image_base64: props.base64,
    longitude: props.longitude,
    latitude: props.latitude,
    recycling_types: props.icon,
    date_taken: date,
    image_id: props.uuid,
  } as any;

  props.setMapPic("");
  await fetch(`${ifDev ? develop : prod}/database/createTrashcanCoords`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

export const getUserMarkers = async () => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
  } as any;

  const d = await fetch(
    `${ifDev ? develop : prod}/database/getUserOwnedTrashcans`,
    {
      method: "POST",
      body: formBody(details),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );

  const json = d.json();
  return json;
};

export const analyzeImg = async (formData: any) => {
  const MLRequest = await fetch(`${ifDev ? develop : prod}/predict`, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  const MLdata = await MLRequest.json();
  return MLdata;
};

export const getUserTrashCans = async (trashCan: string) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    image_ids: trashCan,
  } as any;

  const d = await fetch(`${ifDev ? develop : prod}/database/getTrashcan`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  const json: any = await d.json();

  if (json.error === "Data does not exist") {
    return "error";
  } else {
    return json;
  }
};

export const delete_trashcan = async (trashCan: any) => {
  const id_token = await currentUser().getIdToken();
  let details = {
    id_token: id_token,
    image_id: trashCan,
  } as any;

  await fetch(`${ifDev ? develop : prod}/database/deleteTrashcan`, {
    method: "DELETE",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

export const queryTrashCanLocations = async (lat: number, lng: number) => {
  let details = {
    latitude: lat,
    longitude: lng,
  } as any;

  const d = await fetch(
    `${ifDev ? develop : prod}/database/queryTrashcanLocation`,
    {
      method: "POST",
      body: formBody(details),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  const json: any = d.json();
  return json;
};

export const getTrashCanImage = async (id: any) => {
  let details = {
    image_ids: id,
  } as any;

  const d = await fetch(`${ifDev ? develop : prod}/database/getTrashcanImage`, {
    method: "POST",
    body: formBody(details),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
  const json: any = d.json();
  return json;
};

export const Register = async () => {
  const id_token = await currentUser().getIdToken();

  let details = {
    id_token: id_token,
  } as any;

  let formBody:any = [];
  for (let props in details) {
    let encodedKey = encodeURIComponent(props);
    let encodedVal = encodeURIComponent(details[props]);
    formBody.push(encodedKey + "=" + encodedVal);
  }
  formBody = formBody.join("&") as any;
  const data = await fetch(`${ifDev ? develop : prod}/database/createUser`, {
    method: "POST",
    body: formBody,
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  await data.json();
};