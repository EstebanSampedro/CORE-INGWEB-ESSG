export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Usuario",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "País",
    width: 100,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Teléfono",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 100,
  },
  {
    field: "title",
    headerName: "Título",
    width: 230,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Descripcion",
    width: 200,
  },
  {
    field: "medic",
    headerName: "Médico",
    width: 150,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 100,
  },
  {
    field: "dateTicket",
    headerName: "Fecha Ticket",
    width: 200,
  },
];
