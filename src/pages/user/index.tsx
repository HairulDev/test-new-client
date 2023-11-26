import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  Container,
  Typography,
  CardContent,
} from "@mui/material";
import Link from "next/link";

import { useZustandStore } from "../../services/zustand";
import { useRouter } from "next/router";

const CreateDoctorPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { createUser, updateUser, getUser, user } = useZustandStore();

  const initialState = {
    name: "",
    email: "",
  };
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      await getUser(id);
      setForm((prevForm) => ({ ...prevForm, ...user.data }));
    };

    fetchData();
  }, [id, getUser, user.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (id) {
      console.log(form);
      updateUser(form, id);
      router.push("/");
    } else {
      createUser(form);
      router.push("/");
    }
    setForm(initialState);
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container sx={{ justifyContent: "center", p: 2 }}>
        <CardContent>
          <Card sx={{ m: 1, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {id ? "Update " : "Create "}User
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <Grid container>
                <Grid>
                  <Button type="submit" variant="outlined" size="small">
                    {id ? "Update " : "Create "}
                  </Button>
                </Grid>
                <Grid item sx={{ flexGrow: 1, textAlign: "right" }}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <Link href="/home">Go back to Home</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Card>
        </CardContent>
      </Grid>
    </Container>
  );
};

export default CreateDoctorPage;
