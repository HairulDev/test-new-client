import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import image404 from "../../../assets/images/image404.png";

import { Avatar, Button, CardHeader, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function UserItem(props: any) {
  const { id, name, email, createdAt, setDel, sm }: any = props;

  return (
    <Grid sm={sm}>
      <Card sx={{ m: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }}>{name[0].toUpperCase()}</Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Link href={`/user?id=${id}`}>
                <MoreVertIcon />
              </Link>
            </IconButton>
          }
          title={name}
          subheader={moment(createdAt).fromNow()}
        />
        <CardMedia>
          <Image src={image404} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {email}
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setDel(id)}>
            Del
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
