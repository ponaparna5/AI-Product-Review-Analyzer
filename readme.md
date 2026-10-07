# AI Product Review Analyzer

An AI-powered web application that analyzes product reviews and predicts sentiment using machine learning. The system classifies reviews as Positive, Negative, or Neutral and provides useful insights such as confidence score, rating, category, and AI-generated summary.

## Live Demo

[View Live Project](https://ponaparna5.github.io/AI-Product-Review-Analyzer/)

## Project Overview

The AI Product Review Analyzer is designed to help users quickly understand customer opinions from product reviews. Instead of manually reading a large number of reviews, the application uses Natural Language Processing (NLP) and machine learning techniques to analyze the text and determine its sentiment.

The project uses TF-IDF for converting review text into numerical features and Logistic Regression for sentiment classification.

## Features

- Product review sentiment analysis
- Positive, Negative, and Neutral classification
- Sentiment confidence score
- Product rating analysis
- Review category analysis
- AI-generated review summary
- Interactive web interface
- Simple and user-friendly design
- Real-time review analysis

## How It Works

1. The user enters a product review.
2. The review text is processed and cleaned.
3. TF-IDF converts the text into numerical features.
4. The trained Logistic Regression model analyzes the review.
5. The application predicts the sentiment.
6. The result is displayed with sentiment, confidence, rating, and other insights.

## Machine Learning Approach

### TF-IDF

Term Frequency-Inverse Document Frequency (TF-IDF) is used to convert text data into numerical values that can be processed by the machine learning model.

### Logistic Regression

Logistic Regression is used as the classification algorithm to predict whether a product review is Positive, Negative, or Neutral.

## Dataset

The project uses a product review dataset containing customer reviews and rating information.

The dataset was cleaned and processed before training the machine learning model. Text preprocessing was performed to improve the quality of the input data.

## Data Processing

The following steps were performed during data preparation:

- Removing unnecessary data
- Handling missing values
- Cleaning review text
- Processing ratings
- Creating sentiment labels
- Converting text into numerical features
- Splitting data for model training and testing

## Technologies Used

- Python
- Machine Learning
- Natural Language Processing (NLP)
- TF-IDF
- Logistic Regression
- HTML
- CSS
- JavaScript

## Project Structure

```text
AI-Product-Review-Analyzer/
│
├── backend/
│   └── Machine learning and backend files
│
├── frontend/
│   └── Frontend application files
│
├── index.html
├── script.js
├── style.css
└── README.md
