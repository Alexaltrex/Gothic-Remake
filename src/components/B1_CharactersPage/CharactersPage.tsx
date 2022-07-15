import React, {useEffect, useState} from "react";
import style from "./CharactersPage.module.scss";
import {Title} from "../X_common/Title/Title";
import {useQuery} from "react-query";
import {ICharacterListItem, ICharactersByPage, IMember, SortedByType} from "../../types/characters.types";
import {
    serializeSearchParams,
    sortCharactersByAlphabet,
    sortCharactersByGuild,
    sortCharactersByLocation
} from "../../helpers/helpers";
import {CharacterListItem} from "./CharacterListItem/CharacterListItem";
import {SortBlock} from "./SortBlock/SortBlock";
import {Divider} from "@mui/material";
import clsx from "clsx";
import {useLocation, useSearchParams} from "react-router-dom";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {getCharacters, getCharactersByPage} from "../../api/characters.api";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {Member} from "../X_common/Member/Member";

export const CharactersPage = () => {
    const [sortedBy, setSortedBy] = useState<SortedByType>("alphabet");
    const [page, setPage] = useState(1);
    const [letter, setLetter] = useState("Все");
    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const onChangeHandler = (s: SortedByType) => {
        setLetter("Все");
        setPage(1);
        setSortedBy(s);
    }

    // URL => STATE
    useEffect(() => {
        const sorted = searchParams.get('sorted');
        if (sorted) {
            setSortedBy(sorted as SortedByType);
        }
        const letter = searchParams.get('letter');
        if (letter) {
            setLetter(letter);
        }
        const page = searchParams.get('page');
        if (page) {
            setPage(Number(page));
        }
    }, []);

    // STATE => URL
    useEffect(() => {
        const nextSearchParams = {...serializeSearchParams(searchParams)};
        nextSearchParams.sorted = sortedBy;
        nextSearchParams.letter = letter;
        nextSearchParams.page = String(page);
        if (nextSearchParams.sorted !== "alphabet") {
            delete nextSearchParams.letter
        }
        if (nextSearchParams.sorted !== "pagination") {
            delete nextSearchParams.page
        }


        setSearchParams(nextSearchParams);
    }, [sortedBy, letter, page, location.pathname]);

    const {
        isLoading: isLoadingCharacters,
        isError: isErrorCharacters,
        error: errorCharacters,
        data: characters,
    } = useQuery<ICharacterListItem[], Error>(
        "characters",
        () => getCharacters(),
        {
            enabled: sortedBy !== "pagination"
        }
    );

    const {
        isLoading: isLoadingCharactersByPage,
        isFetching,
        isError: isErrorCharactersByPage,
        error: errorCharactersByPage,
        data: charactersByPage,
    } = useQuery<ICharactersByPage, Error>(
        ["charactersByPage", page],
        () => getCharactersByPage(page),
        {
            enabled: sortedBy === "pagination",
            keepPreviousData: true
        }
    );

    console.log(charactersByPage)

    const onChangePageHandler = (event: React.ChangeEvent<unknown>, page: number) => setPage(page)

    return (
        <div className={style.charactersPage}>
            <ErrorWrapper isLoading={isLoadingCharacters || isLoadingCharactersByPage || isFetching}
                          isError={isErrorCharacters || isErrorCharactersByPage}
                          error={errorCharacters ? errorCharacters : errorCharactersByPage}
            >
                <Title title="Персонажи"/>

                {
                    characters && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {characters.length}</p>
                                <SortBlock sortedBy={sortedBy}
                                           onChange={onChangeHandler}
                                />
                            </div>
                            <Divider className={style.divider}/>

                            {
                                sortedBy === "alphabet" && (
                                    <>
                                        <div className={style.alphabet}>

                                            {
                                                ["Все", ...sortCharactersByAlphabet(characters).map(el => Object.keys(el)[0])]
                                                    .map(l => (
                                                        <button key={l}
                                                                className={clsx({
                                                                    [style.item]: true,
                                                                    [style.item_selected]: l === letter,
                                                                })}
                                                                onClick={() => setLetter(l)}
                                                        >
                                                            {l}
                                                        </button>
                                                    ))
                                            }
                                        </div>
                                        <Divider className={style.divider}/>
                                    </>
                                )
                            }

                            {
                                sortedBy === 'pagination' && charactersByPage && (
                                    <>
                                        <Pagination count={charactersByPage.pages}
                                                    page={page}
                                                    variant="outlined"
                                                    shape="rounded"
                                                    size="small"
                                                    sx={{
                                                        "& .MuiPaginationItem-root": {
                                                            "color": "#ffcc80"
                                                        }
                                                    }}
                                                    renderItem={(item) => (
                                                        <PaginationItem
                                                            sx={sxPaginationItem}
                                                            {...item}
                                                        />
                                                    )}
                                                    onChange={onChangePageHandler}
                                                    className={style.pagination}
                                        />
                                        <Divider className={style.divider}/>
                                    </>
                                )
                            }

                            {
                                sortedBy === 'pagination' && charactersByPage && (
                                    <div className={style.paginationList}>
                                        {
                                            charactersByPage.characters.map((member) => <Member key={member.id} {...member}/>)
                                        }
                                    </div>
                                )
                            }

                            {
                                sortedBy !== "pagination" &&
                                <div className={style.list}>
                                    {
                                        (
                                            sortedBy === "alphabet"
                                                ? sortCharactersByAlphabet(characters)
                                                : sortedBy === "location"
                                                ? sortCharactersByLocation(characters)
                                                : sortCharactersByGuild(characters)
                                        )
                                            .map((el, index) => {
                                                    if (
                                                        Object.values(el)[0].length === 0 ||
                                                        (letter !== "Все" && Object.keys(el)[0] !== letter)
                                                    ) return null
                                                    return (
                                                        <div key={index}
                                                             className={clsx({
                                                                 [style.group]: true,
                                                                 [style.group_location]: sortedBy === "location" || sortedBy === "guild",
                                                             })}
                                                        >
                                                            <p className={style.groupLabel}>{Object.keys(el)[0]}</p>
                                                            <div className={style.listOfGroup}>
                                                                {
                                                                    Object.values(el)[0].map(character => (
                                                                            <CharacterListItem key={character.id}
                                                                                               {...character}
                                                                            />
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                    }
                                </div>
                            }



                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}

const sxPaginationItem = {
    "color": "#ffcc80",
    "border": "1px solid #ffcc80",
    "&.Mui-selected": {
        "color": "#76ff03!important",
        "border": "2px solid #76ff03",
    }
}