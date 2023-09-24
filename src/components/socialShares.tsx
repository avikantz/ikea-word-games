"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, HStack, IconButton, IconButtonProps, StackProps, Text } from "@chakra-ui/react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import i18next from "i18next";

import { useTranslation } from "@/app/i18n/client";
import { BASE_URL } from "@/utils/constants";
import { PADDING } from "@/theme";

interface SocialShareButtonsProps extends Omit<IconButtonProps, "aria-label"> {
  desc?: string;
  iconSize?: number | string;
  iconColor?: string;
  bgColor?: string;
  stackProps?: StackProps;
}

export const SocialShareButtons = ({
  desc,
  iconSize = 32,
  iconColor = "#FFE85C",
  bgColor = "#111111",
  stackProps,
  ...props
}: SocialShareButtonsProps) => {
  const { t } = useTranslation();

  const shareUrl = `${BASE_URL}${i18next.language ?? "en"}`;
  const [isNativeShareSupported, setNativeShareSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ url: shareUrl })) {
      setNativeShareSupported(true);
    }
  }, [shareUrl]);

  // Native share button
  if (isNativeShareSupported) {
    return (
      <Button
        onClick={() => navigator.share({ title: t("common.title"), text: t("common.share.desc"), url: shareUrl })}
      >
        {t("common.share")}
      </Button>
    );
  }

  return (
    <Box>
      <Text textAlign="center" fontWeight="semibold" mb={PADDING.SM}>
        {t("common.share")}
      </Text>
      <HStack spacing="0" gap={{ base: 2, md: 3 }} flexWrap="wrap" justifyContent="center" {...stackProps}>
        <EmailShareButton subject={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<EmailIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="email"
            {...props}
          />
        </EmailShareButton>
        <FacebookShareButton quote={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<FacebookIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="facebook"
            {...props}
          />
        </FacebookShareButton>
        <LineShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<LineIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="line"
            {...props}
          />
        </LineShareButton>
        <LinkedinShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<LinkedinIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="linkedin"
            {...props}
          />
        </LinkedinShareButton>
        <PinterestShareButton
          description={desc || t("common.share.desc")}
          url={shareUrl}
          media={`${shareUrl}/assets/cover.jpg`}
        >
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<PinterestIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="pinterest"
            {...props}
          />
        </PinterestShareButton>
        <RedditShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<RedditIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="reddit"
            {...props}
          />
        </RedditShareButton>
        <TelegramShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<TelegramIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="telegram"
            {...props}
          />
        </TelegramShareButton>
        <TumblrShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<TumblrIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="twitter"
            {...props}
          />
        </TumblrShareButton>
        <TwitterShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<TwitterIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="twitter"
            {...props}
          />
        </TwitterShareButton>
        <WhatsappShareButton title={desc || t("common.share.desc")} url={shareUrl}>
          <IconButton
            as="span"
            size="lg"
            variant="outline"
            icon={<WhatsappIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
            aria-label="tumblr"
            {...props}
          />
        </WhatsappShareButton>
      </HStack>
    </Box>
  );
};
