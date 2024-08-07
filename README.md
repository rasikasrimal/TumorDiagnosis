# Tumor Diagnosis: Exploratory Data Analysis

[**Kaggle Notebook**](https://www.kaggle.com/code/rasikasrimal/tumor-diagnosis)

![Dataset Cover](https://storage.googleapis.com/kaggle-datasets-images/180/384/3da2510581f9d3b902307ff8d06fe327/dataset-cover.jpg)

## About the Dataset

The **Breast Cancer Diagnostic data** is sourced from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29). It is also accessible through the [UW CS FTP server](http://ftp.cs.wisc.edu/math-prog/cpo-dataset/machine-learn/cancer/WDBC/).

This dataset comprises features computed from digitized images of fine needle aspirates (FNA) of breast masses. These features describe the characteristics of cell nuclei present in the images. The dataset is discussed in the paper: [K. P. Bennett and O. L. Mangasarian: "Robust Linear Programming Discrimination of Two Linearly Inseparable Sets", Optimization Methods and Software 1, 1992, 23-34](https://doi.org/10.1080/10509589208826835).

### Attribute Information

- **ID number**: Unique identifier for each instance.
- **Diagnosis**: Class label (M = malignant, B = benign).
- **Features**: Derived from the cell nuclei in the images, including:
  1. Radius (mean of distances from center to points on the perimeter)
  2. Texture (standard deviation of gray-scale values)
  3. Perimeter
  4. Area
  5. Smoothness (local variation in radius lengths)
  6. Compactness (perimeter^2 / area - 1.0)
  7. Concavity (severity of concave portions of the contour)
  8. Concave Points (number of concave portions of the contour)
  9. Symmetry
  10. Fractal Dimension ("coastline approximation" - 1)

The dataset includes 30 features in total, with each feature having mean, standard error, and "worst" values.

- **Data Quality**: No missing values.
- **Class Distribution**: 357 benign cases, 212 malignant cases.

## Installation

To run the notebook, you need the following dependencies:

- Python 3.x
- Jupyter Notebook
- pandas
- seaborn
- matplotlib
