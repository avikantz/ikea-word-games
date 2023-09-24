"use client";

import { Button, HStack, IconButton, Input, Text, VStack, useDisclosure, Box, Spacer } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { IKEAProduct } from "@/interfaces";
import { ChangeEventHandler, KeyboardEventHandler, LegacyRef, Ref, useEffect, useRef, useState } from "react";
import { useVadarjag } from "@/hooks/useVadarjag";
import { GameContainer, GameTitle, IKEAProductCard, IKEAProductCardSkeleton } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { VadarjagWhatIsThisModal } from "@/components/vadarjag";
import { PADDING } from "@/theme";

export default function Vadarjag({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);

  // Modals
  const {
    isOpen: isOpenWhatIsThisModal,
    onOpen: onOpenWhatIsThisModal,
    onClose: onCloseWhatIsThisModal,
  } = useDisclosure();

  // Refs
  const containerRef = useRef<HTMLDivElement>();
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

    // Scroll game container into view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

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

    // Scroll game container into view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

    setProducts(getClosestProducts(debouncedValue));
  }, [debouncedValue, getClosestProducts]);

  return (
    <Box>
      <GameTitle title={t("vadarjag.title")} onInfoClick={onOpenWhatIsThisModal} />

      <GameContainer ref={containerRef as Ref<HTMLDivElement>}>
        <Text textAlign="center">{t("vadarjag.desc")}</Text>

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
            placeholder={t("vadarjag.placeholder")}
            ref={inputRef as LegacyRef<HTMLInputElement>}
            textAlign="center"
            onKeyUp={onInputKeyUp}
          />
          <IconButton icon={<Text>⏎</Text>} aria-label="Hit me" size="lg" variant="outline" onClick={findProducts} />
        </HStack>

        <Spacer display={{ base: "none", md: "flex" }} />

        <VStack spacing={PADDING.DEFAULT} alignItems="stretch">
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
              {showMore ? t("common.show_less") : t("common.show_more")}
            </Button>
          )}
        </VStack>

        <Spacer display={{ base: "flex", md: "none" }} />
      </GameContainer>

      <VadarjagWhatIsThisModal isOpen={isOpenWhatIsThisModal} onClose={onCloseWhatIsThisModal} />
    </Box>
  );
}
