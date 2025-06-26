import { theme } from "@/constants/theme";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  InputWrapper,
  OptionItem,
  OptionList,
  PickerWrapper,
  StyledSelectInput,
  StyledSelectInputText,
  StyledTextInput,
  Subtitle,
  TextInputWrapper,
} from "./Input.styles";
import { InputProps } from "./Input.types";

export function Input({
  type,
  value,
  label,
  onChange,
  placeholder,
  options = [],
  disabled = false,
  isPassword,
  keyboardType,
  maxLength,
  name,
  openSelect,
  setOpenSelect,
}: InputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const isSelectOpen = openSelect === name;
  const [selectLayout, setSelectLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [showPassword, setShowPassword] = useState(false);

  const selectedOptionLabel =
    options.find((option) => option.value === value)?.label ||
    placeholder ||
    "Selecione";

  return (
    <InputWrapper>
      {type === "text" ? (
        <>
          {label && <Subtitle>{label}</Subtitle>}
          <TextInputWrapper>
            <StyledTextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.placeholder}
              editable={!disabled}
              maxLength={maxLength}
              secureTextEntry={isPassword && !showPassword}
              keyboardType={keyboardType === "N" ? "numeric" : "default"}
            />

            {isPassword && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={
                    showPassword ? theme.colors.midnight60 : theme.colors.black
                  }
                  style={{
                    marginRight: 16,
                  }}
                />
              </TouchableOpacity>
            )}
          </TextInputWrapper>
        </>
      ) : type === "select" ? (
        <PickerWrapper>
          {label && <Subtitle>{label}</Subtitle>}
          <StyledSelectInput
            onLayout={(event: any) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              setSelectLayout({ x, y, width, height });
            }}
            placeholder={placeholder}
            onPress={() =>
              setOpenSelect && setOpenSelect(isSelectOpen ? null : name ?? null)
            }
            disabled={disabled}
          >
            <StyledSelectInputText
              style={{
                color: value ? theme.colors.black : theme.colors.placeholder,
              }}
            >
              {selectedOptionLabel}
            </StyledSelectInputText>
            <Ionicons
              name={isSelectOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color={theme.colors.black60}
            />
          </StyledSelectInput>

          {isSelectOpen && (
            <OptionList
              style={{
                top: selectLayout.y + selectLayout.height,
                left: selectLayout.x,
                width: selectLayout.width,
                position: "absolute",
                zIndex: 1010,
              }}
            >
              {options.map((option, index) => (
                <OptionItem
                  key={option.value}
                  isLast={index === options.length - 1}
                  onPress={() => {
                    onChange(option.value);
                    setOpenSelect && setOpenSelect(null);
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{option.label}</Text>
                </OptionItem>
              ))}
            </OptionList>
          )}
        </PickerWrapper>
      ) : (
        <>
          {label && <Subtitle>{label}</Subtitle>}
          <StyledSelectInput
            label={label}
            onPress={() => setShowPicker(true)}
            disabled={disabled}
          >
            <StyledSelectInputText
              style={{
                color: value ? theme.colors.black : theme.colors.placeholder,
              }}
            >
              {value instanceof Date ? formatDate(value) : placeholder}
            </StyledSelectInputText>
            <Ionicons
              name="calendar"
              size={18}
              color={theme.colors.placeholder}
            />
          </StyledSelectInput>
          <DateTimePickerModal
            isVisible={showPicker}
            mode="date"
            onConfirm={(date) => {
              setShowPicker(false);
              onChange(date);
            }}
            onCancel={() => setShowPicker(false)}
            minimumDate={new Date()}
            locale="pt-BR"
            positiveButton={{
              label: "Confirmar",
              textColor: theme.colors.blue,
            }}
            negativeButton={{ label: "Cancelar", textColor: theme.colors.red }}
          />
        </>
      )}
    </InputWrapper>
  );
}
