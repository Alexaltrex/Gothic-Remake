import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import img1 from "../../assets/jpeg/home/characters.jpg";
import img2 from "../../assets/jpeg/home/guilds.jpg";
import img3 from "../../assets/jpeg/home/locations.jpg";
import img4 from "../../assets/jpeg/home/religions.jpg";
import img5 from "../../assets/jpeg/home/races.jpg";
import {IBurgerLink} from "../../types/app.types";

export const links: IBurgerLink[] = [
    {
        to: '/',
        label: 'Главная',
        icon: <HomeIcon/>,
        src: "",
    },
    {
        to: '/characters',
        label: 'Персонажи',
        icon: <AccountCircleIcon/>,
        src: img1,
    },
    {
        to: '/guilds',
        label: 'Гильдии',
        icon: <PeopleAltIcon />,
        src: img2,
    },
    {
        to: '/locations',
        label: 'Локации',
        icon: <ExploreIcon/>,
        src: img3,
    },
    {
        to: '/religions',
        label: 'Религии',
        icon: <FireplaceIcon/>,
        src: img4,
    },
    {
        to: '/races',
        label: 'Расы',
        icon: <SupervisedUserCircleIcon/>,
        src: img5,
    },
];