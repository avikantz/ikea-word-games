"use client";

import { Button, Divider, HStack, Heading, IconButton, Input, Text, VStack, useDisclosure } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { GAMES, IKEAProduct } from "@/interfaces";
import { ChangeEventHandler, KeyboardEventHandler, LegacyRef, useEffect, useRef, useState } from "react";
import { useVadarjag } from "@/hooks/useVadarjag";
import { IKEAProductCard, IKEAProductCardSkeleton } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { VadarjagWhatIsThisModal } from "@/components/vadarjag";

export default function Vadarjag({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);
  const { t: v } = useTranslation(lang, GAMES.VADARJAG);

  // Modals
  const {
    isOpen: isOpenWhatIsThisModal,
    onOpen: onOpenWhatIsThisModal,
    onClose: onCloseWhatIsThisModal,
  } = useDisclosure();

  // Refs
  const inputRef = useRef<HTMLInputElement>();

  // State
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 1000);

  const [products, setProducts] = useState<IKEAProduct[]>([]);
  const { isOpen: showMore, onToggle: toggleMore, onClose: hideMore } = useDisclosure();

  const { getClosestProducts } = useVadarjag({});

  // Actions
  const findProducts = () => {
    if (!value) return;

    setProducts(getClosestProducts(value));
  };

  // Support enter key submit
  const onInputKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    if (event.key !== "Enter") return;
    findProducts();
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Reset state
    setProducts([]);
    hideMore();
    // Clean input
    const value = event.target.value.clean().removeWhitespaces();
    setValue(value);
  };

  // Auto fetch products on debounced value change
  useEffect(() => {
    if (!debouncedValue) return;

    setProducts(getClosestProducts(debouncedValue));
  }, [debouncedValue, getClosestProducts]);

  return (
    <VStack spacing={{ base: 4, md: 8 }} alignItems="stretch">
      <HStack justifyContent="center" spacing="4">
        <Heading textAlign="center" textTransform="capitalize" fontSize={{ base: "xl", md: "2xl" }}>
          {v("title")}
        </Heading>
        <IconButton
          variant="outline"
          size="sm"
          isRound
          icon={<Text>?</Text>}
          aria-label={v("what_is_this.title")}
          onClick={onOpenWhatIsThisModal}
        />
      </HStack>

      <Text textAlign="center">{v("desc")}</Text>

      <HStack justifyContent="center">
        <Input
          size="lg"
          autoFocus
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          autoSave="off"
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder={v("placeholder")}
          ref={inputRef as LegacyRef<HTMLInputElement>}
          textAlign="center"
          onKeyUp={onInputKeyUp}
        />
        <IconButton icon={<Text>⏎</Text>} aria-label="Hit me" size="lg" variant="outline" onClick={findProducts} />
      </HStack>

      <Divider />

      {products.length === 0 && value.length > 0 && [1, 2, 3].map((i) => <IKEAProductCardSkeleton key={i} />)}

      {products.slice(0, 3).map((product) => (
        <IKEAProductCard key={product.id} product={product} showName showImage showDesc />
      ))}

      {showMore &&
        products.length > 3 &&
        products
          .slice(3)
          .map((product) => <IKEAProductCard key={product.id} product={product} showName showImage showDesc />)}

      {products.length > 3 && (
        <Button variant={showMore ? "outline" : "solid"} onClick={toggleMore}>
          {showMore ? t("show_less") : t("show_more")}
        </Button>
      )}

      <VadarjagWhatIsThisModal isOpen={isOpenWhatIsThisModal} onClose={onCloseWhatIsThisModal} />
    </VStack>
  );
}
