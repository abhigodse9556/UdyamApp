import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Product, saveProduct, updateProduct } from "../../services/product";
import Button from "../ui/button";
import ExpoCheckBox from "../ui/expoCheckbox";
import Input from "../ui/input";
type ProductFormProps = {
  isEditMode?: boolean;
  productData?: Product;
  onClose: (updated?: boolean) => void;
};

const ProductForm = (props: ProductFormProps) => {
  const { isEditMode, productData, onClose } = props;
  const [formData, setFormData] = useState<Product>({} as Product);
  const [errorState, setErrorState] = useState<
    Partial<Record<keyof Product, string>>
  >({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof Product, boolean>>
  >({});
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const handleInputChange = (
    field: keyof Product,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Product, string>> = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.costPrice) {
      errors.costPrice = "Cost Price is required";
    }
    if (!formData.mrp) {
      errors.mrp = "MRP is required";
    }
    if (formData.mrp && formData.rate > formData.mrp) {
      errors.rate = "Selling Rate cannot be higher than MRP";
    }
    if (
      formData.costPrice &&
      formData.mrp &&
      formData.mrp < formData.costPrice
    ) {
      errors.mrp = "MRP cannot be lower than Cost Price";
    }
    if (formData.costPrice && formData.rate < formData.costPrice) {
      errors.rate = "Selling Rate cannot be lower than Cost Price";
    }
    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const generateId = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 5);
    return `UAP-${timestamp}_${randomString}`;
  };

  const handleSubmit = useCallback(async () => {
    if (!isEditMode) {
      await saveProduct({ ...formData, id: generateId() } as Product);
      setFormData({} as Product);
    } else {
      await updateProduct(formData);
    }
    onClose(true);
  }, [formData, isEditMode, onClose]);

  useEffect(() => {
    if (isEditMode && productData) {
      setFormData({ ...productData } as Product);
    }
  }, [isEditMode, productData]);
  useEffect(() => {
    if (formData.alwaysSellOnMrp) {
      setFormData((prev) => ({ ...prev, rate: prev.mrp || 0 }));
    }
  }, [formData.alwaysSellOnMrp, formData.mrp]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {isEditMode ? "Edit Product" : "Add New Product"}
        </Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={80}
        keyboardOpeningTime={0}
      >
        <Input
          label="Product Name"
          placeholder="Enter product name"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
          error={errorState.name}
          touched={touchedFields.name}
          onBlur={() => setTouchedFields((prev) => ({ ...prev, name: true }))}
        />
        <Input
          label="Cost Price"
          placeholder="Enter cost price"
          value={formData.costPrice?.toString()}
          onChangeText={(value) =>
            handleInputChange("costPrice", parseFloat(value) || 0)
          }
          error={errorState.costPrice}
          touched={touchedFields.costPrice}
          onBlur={() => {
            setTouchedFields((prev) => ({ ...prev, costPrice: true }));
            validateForm();
          }}
          keyboardType="number-pad"
        />
        <Input
          label="MRP"
          placeholder="Enter MRP"
          value={formData.mrp?.toString()}
          onChangeText={(value) =>
            handleInputChange("mrp", parseFloat(value) || 0)
          }
          error={errorState.mrp}
          touched={touchedFields.mrp}
          onBlur={() => {
            setTouchedFields((prev) => ({ ...prev, mrp: true }));
            validateForm();
          }}
          keyboardType="number-pad"
        />
        <ExpoCheckBox
          label="Always sell on MRP"
          value={formData.alwaysSellOnMrp || false}
          onValueChange={(value) => handleInputChange("alwaysSellOnMrp", value)}
        />
        <Input
          label="Selling Rate"
          placeholder="Enter selling rate"
          value={formData.rate?.toString()}
          onChangeText={(value) =>
            handleInputChange(
              "rate",
              formData.alwaysSellOnMrp
                ? formData.mrp || 0
                : parseFloat(value) || 0,
            )
          }
          error={errorState.rate}
          touched={touchedFields.rate}
          onBlur={() => {
            setTouchedFields((prev) => ({ ...prev, rate: true }));
            validateForm();
          }}
          editable={!formData.alwaysSellOnMrp}
          keyboardType="number-pad"
        />
        <ExpoCheckBox
          label="Allow discount"
          value={formData.allowDiscount || false}
          onValueChange={(value) => handleInputChange("allowDiscount", value)}
        />
        <Input
          label="Discount"
          placeholder="Enter discount"
          value={formData.discount?.toString()}
          onChangeText={(value) =>
            handleInputChange("discount", parseFloat(value) || 0)
          }
          editable={!!formData.allowDiscount}
          keyboardType="number-pad"
        />
        <Input
          label="Stock"
          placeholder="Enter stock quantity"
          value={formData.stock?.toString()}
          onChangeText={(value) =>
            handleInputChange("stock", parseInt(value) || 0)
          }
          keyboardType="number-pad"
        />
        <Input
          label="Description"
          placeholder="Enter product description"
          value={formData.description}
          onChangeText={(value) => handleInputChange("description", value)}
          multiline
          numberOfLines={4}
        />
        <ExpoCheckBox
          label={
            isEditMode ? "View Additional Details" : "Fill Additional Details"
          }
          value={showAdditionalDetails}
          onValueChange={setShowAdditionalDetails}
        />
        {showAdditionalDetails && (
          <>
            <Input
              label="Brand"
              placeholder="Enter product brand"
              value={formData.brand}
              onChangeText={(value) => handleInputChange("brand", value)}
            />
            <Input
              label="Color"
              placeholder="Enter product color"
              value={formData.color}
              onChangeText={(value) => handleInputChange("color", value)}
            />
            <Input
              label="Material"
              placeholder="Enter product material"
              value={formData.material}
              onChangeText={(value) => handleInputChange("material", value)}
            />
            <Input
              label="Size"
              placeholder="Enter product size"
              value={formData.size}
              onChangeText={(value) => handleInputChange("size", value)}
            />
            <Input
              label="Weight"
              placeholder="Enter product weight"
              value={formData.weight}
              onChangeText={(value) => handleInputChange("weight", value)}
            />
            <Input
              label="Length"
              placeholder="Enter product length"
              value={formData.length}
              onChangeText={(value) => handleInputChange("length", value)}
            />
            <Input
              label="Width"
              placeholder="Enter product width"
              value={formData.width}
              onChangeText={(value) => handleInputChange("width", value)}
            />
            <Input
              label="Height"
              placeholder="Enter product height"
              value={formData.height}
              onChangeText={(value) => handleInputChange("height", value)}
            />
            <Input
              label="Image URL"
              placeholder="Enter product image URL"
              value={formData.image}
              onChangeText={(value) => handleInputChange("image", value)}
            />
            <Input
              label="Category"
              placeholder="Enter product category"
              value={formData.category}
              onChangeText={(value) => handleInputChange("category", value)}
            />
            <Input
              label="Sub-Category"
              placeholder="Enter product sub-category"
              value={formData.subCategory}
              onChangeText={(value) => handleInputChange("subCategory", value)}
            />
          </>
        )}
      </KeyboardAwareScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={isEditMode ? "Update Product" : "Save Product"}
          onPress={() => {
            if (validateForm()) {
              handleSubmit();
            }
          }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            onClose(false);
          }}
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 50,
    paddingTop: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  formContainer: {
    marginBottom: 20,
    gap: 0,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
  },
  btnContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,
  },
});

export default ProductForm;
