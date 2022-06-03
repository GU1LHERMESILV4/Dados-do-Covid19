import React, {memo} from "react";
// import RefreshIcon from "../../../assets/images/refresh.ext"
import {Card, Typography, Button, Select, MenuItem } from "../../../components";
import COUNTRIES from "../../../commons/constants/countries"
import { CardPanelContentStyled, ItemStyled, TypographyStyled } from "./style";

const navigatorHasShare = navigator.share

function Panel({updateAt, onChange, data, country, getCoviddata}){
    const {cases, recovered, deaths, todayCases, todayDeaths} = data;
    
    const renderContries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                {/* <img src={country.flag} alt="" /> */}
            </ItemStyled>
        </MenuItem>
    )
    const textoCovid19 = `País: ${country}`

    const shareInfo = () => {
        navigator.share({
            title: `Dados COVID19 - ${country}`,
            text: textoCovid19,
            url: "http://covid19dio.netlify.app/"

        })
    }

    const copyInfo = () =>{
        navigator.clipboard.writeText(textoCovid19)
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div> 
    )

    const renderCopyButton = (
        <div>
            <Button variant="container" color="orimary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    )



    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <TypographyStyled variant="h5" component="span" color="primary">
                        COVID19
                    </TypographyStyled>
                    <TypographyStyled variant="h6" component="span" color="primary">
                        Painel Coronavirus
                    </TypographyStyled>
                    <TypographyStyled variant="body2" component="span" color="primary">
                        Atualizado em {updateAt}
                    </TypographyStyled>
                    <div className="pt-2"> 
                        <Select onChange ={onChange} value={country}>
                            { COUNTRIES.map(renderContries) }
                        </Select> 
                    </div>
                </div>
                {/* {navigatorHasShare ? renderShareButton : renderCopyButton} */}
                {navigatorHasShare ? renderCopyButton : renderShareButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel) 