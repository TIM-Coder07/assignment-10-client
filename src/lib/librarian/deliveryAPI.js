const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// USER getUserDeliveries
export const getUserDeliveries = async (email) => {
  const res = await fetch(
    `${API_URL}/deliveries/user/${email}`
  );

  return res.json();
};

export const createDeliveryRequest = async (data) => {
  const res = await fetch(`${API_URL}/deliveries`, {
    method: "POST",

    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return res.json();
};

export const getLibrarianDeliveries = async (email) => {
  const res = await fetch(`${API_URL}/deliveries/librarian/${email}`);

  return res.json();
};

export const updateDeliveryStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/deliveries/${id}/status`, {
    method: "PATCH",

    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      status,
    }),
  });

  return res.json();
};
