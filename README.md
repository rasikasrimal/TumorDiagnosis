

# Tumor Diagnosis (Part 1): Exploratory Data Analysis

![Dataset Cover](https://storage.googleapis.com/kaggle-datasets-images/180/384/3da2510581f9d3b902307ff8d06fe327/dataset-cover.jpg)

## Introduction

This project is an exploratory data analysis (EDA) of the Breast Cancer Diagnostic dataset. The goal is to gain insights into the dataset and prepare it for further analysis and modeling.

## About the Dataset

The [Breast Cancer Diagnostic data](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29) is available on the UCI Machine Learning Repository. This database is also available through the [UW CS ftp server](http://ftp.cs.wisc.edu/math-prog/cpo-dataset/machine-learn/cancer/WDBC/).

Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image. The dataset is described in the paper: [K. P. Bennett and O. L. Mangasarian: "Robust Linear Programming Discrimination of Two Linearly Inseparable Sets", Optimization Methods and Software 1, 1992, 23-34].

### Attribute Information

- ID number
- Diagnosis (M = malignant, B = benign)
- Ten real-valued features are computed for each cell nucleus:
  1. radius (mean of distances from center to points on the perimeter)
  2. texture (standard deviation of gray-scale values)
  3. perimeter
  4. area
  5. smoothness (local variation in radius lengths)
  6. compactness (perimeter^2 / area - 1.0)
  7. concavity (severity of concave portions of the contour)
  8. concave points (number of concave portions of the contour)
  9. symmetry
  10. fractal dimension ("coastline approximation" - 1)

The mean, standard error, and "worst" or largest (mean of the three largest values) of these features were computed for each image, resulting in 30 features.

- All feature values are recorded with four significant digits.
- Missing attribute values: none
- Class distribution: 357 benign, 212 malignant

## Installation

To run the notebook, you need to have the following dependencies installed:

- Python 3.x
- Jupyter Notebook
- pandas
- seaborn
- matplotlib

You can install the required packages using:

```bash
pip install pandas seaborn matplotlib
```


sns.jointplot(x=x['concavity_worst'], y=x['concave points_worst'], kind="reg", color="#ce1414")
```
