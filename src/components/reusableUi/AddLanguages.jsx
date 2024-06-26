import { Box ,Button,FormControl,Grid, InputLabel, MenuItem, Select} from '@mui/material'
import React, { useEffect, useState } from 'react'
import languages from '../../data/languages' 
import { useTranslation } from 'react-i18next';
import {useLangLevel} from '../../hooks/useLangLevel'
import Cookies from 'js-cookie';

export default function AddLanguages({chosenlanguages,setChosenLanguages}) {
    
    const {t} = useTranslation()
    const langCookie = Cookies.get("i18next") || "en";

    const {data,isLoading} = useLangLevel()

    function addNewLanguage()
    {
        setChosenLanguages(back=>[...back,{LanguageId:1,LanguageLevelId:1,id:chosenlanguages.length+1}])
    }

    function handleChangeLevel(selectedLang,level)
    {
        setChosenLanguages(back=>back.map(lang=>
        {
            return lang===selectedLang?{...lang,LanguageLevelId:level}:lang
        }))
    }

    function handleChangeLanguage(selectedLang,language)
    {
        setChosenLanguages(back=>back.map(lang=>
        {
            return lang===selectedLang?{...lang,LanguageId:language}:lang
        }))
    }

    function deleteLanguage(selectedLang)
    {   
        const languages = chosenlanguages.filter(lang=>lang!==selectedLang)
        setChosenLanguages(languages)
    }

    return (
        <Box sx={{marginBottom:"26px"}}>
            {
                chosenlanguages?.length>0&&chosenlanguages.map((language,index)=>
                {
                    return(
                        <Grid container key={index+'po1'} spacing={3} sx={{marginBottom:"20px"}} alignItems="center">
                            <Grid item xs={12} md={5}>
                            <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>{t('languagesSpokne')}</InputLabel>
                                <FormControl fullWidth>
                                    <Select value={language.LanguageId}
                                    onChange={(e)=>handleChangeLanguage(language,e.target.value)}>
                                        {
                                            languages.map((lang,index)=>
                                            {
                                                return(
                                                    <MenuItem key={index+'a1'} value={lang.id}>{langCookie==="ar"?lang.title_ar:lang.title_en}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={5}>
                            <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>{t('level')}</InputLabel>
                                <FormControl fullWidth>
                                    <Select value={language.LanguageLevelId} 
                                    onChange={(e)=>handleChangeLevel(language,e.target.value)}>
                                        {
                                            !isLoading&&data?.data.length>0&&data.data.map((level,index)=>
                                            {
                                                return(
                                                    <MenuItem key={index+'a2'} value={level.id}>{langCookie==="ar"?level.titleAR:level.titleEN}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid md={2}>
                                <Button onClick={()=>deleteLanguage(language)} sx={{marginTop:"6px"}} color="error">{t('delete')}</Button>
                            </Grid>
                        </Grid> 
                    )
                })
            }
            <Button sx={{fontSize:"12px",marginTop:"4px"}} color="secondary"
            onClick={addNewLanguage}>{t('addLanguage')}</Button>
        </Box>
    )
}