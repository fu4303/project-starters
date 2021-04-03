import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import alanBtn from '@alan-ai/alan-sdk-web'
import dotenv from 'dotenv'

import wordsToNumbers from 'words-to-numbers'

import { NewsCards } from './components/'
import useStyles from './styles.js'

dotenv.config()


const alanKey = process.env.REACT_APP_ALAN_KEY

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1)
    const classes = useStyles()

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if (article) {
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening...')
                    } else {
                        alanBtn().playText('Please try that again...')
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                    </div>
                ) : null}
                <img src="https://www.fintechfutures.com/files/2017/11/AI-FOT-A.jpg" className={classes.logo} alt="AI Logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App