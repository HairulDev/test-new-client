import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  Container,
  Card,
  Button,
  TextField,
  DialogActions,
  Pagination,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import { useZustandStore } from "../../services/zustand";

import UserItem from "../../components/molecules/UserItem";
import Loader from "components/Loader";
import Header from "components/molecules/Header";
import Link from "next/link";

const theme = createTheme();

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [del, setDel] = useState();

  const initialState = {
    search: "",
    name: "",
    email: "",
  };
  const [form, setForm] = useState(initialState);

  const { getUsers, users, delUser } = useZustandStore();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as number);
    setPage(1);
  };

  const handleSearch = () => {
    setSearchQuery(form.search);
    setPage(1);
    getUsers(limit, 1, searchQuery);
  };

  useEffect(() => {
    delUser(del);
    getUsers(limit, page, searchQuery);
  }, [del]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUsers(limit, page, searchQuery);
  }, [limit, page, searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Container component="main" maxWidth="md">
          <Grid container sx={{ marginTop: 2 }}>
            <DialogActions>
              <Grid>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search for user..."
                  onChange={onChange}
                  value={form.search}
                  name="search"
                  autoComplete="off"
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid>
                <Button variant="outlined" onClick={handleSearch}>
                  Search
                </Button>
              </Grid>
              <Grid>
                <Link href="/user">
                  <Button variant="outlined" size="small">
                    Create User
                  </Button>
                </Link>
              </Grid>
            </DialogActions>
            <Card
              sx={{
                marginTop: 2,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container sx={{ justifyContent: "center", p: 2 }}>
                {users ? (
                  users.data.map((item: any) => (
                    <UserItem
                      id={item.id}
                      name={item.name}
                      email={item.email}
                      createdAt={item.created_at}
                      setDel={setDel}
                      sm={4}
                      key={item.id}
                    />
                  ))
                ) : (
                  <Card sx={{ width: 1100 }}>
                    <Loader />
                  </Card>
                )}
              </Grid>
              <Grid
                container
                sx={{
                  marginTop: 2,
                  padding: 2,
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Grid sx={{ verticalAlign: "bottom" }}>
                  <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                    <InputLabel>Limit</InputLabel>
                    <Select
                      value={limit}
                      onChange={() => {
                        handleChange;
                      }}
                      autoWidth
                      label="Limit"
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(users?.pagination.total / limit)}
                      page={page}
                      onChange={(event, value) => setPage(value)}
                      color="primary"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default Home;
