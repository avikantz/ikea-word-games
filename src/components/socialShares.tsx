import React from "react";
import { HStack, IconButton, IconButtonProps, StackProps } from "@chakra-ui/react";
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

import { useTranslation } from "@/app/i18n/client";

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

  const shareUrl = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.href;

  return (
    <HStack spacing="0" gap={{ base: 2, md: 3 }} flexWrap="wrap" justifyContent="center" {...stackProps}>
      <EmailShareButton subject={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<EmailIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="email"
          {...props}
        />
      </EmailShareButton>
      <FacebookShareButton quote={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<FacebookIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="facebook"
          {...props}
        />
      </FacebookShareButton>
      <LineShareButton title={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<LineIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="line"
          {...props}
        />
      </LineShareButton>
      <LinkedinShareButton title={desc || t("share.desc")} url={shareUrl}>
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
        description={desc || t("share.desc")}
        url={shareUrl}
        media={`${process.env.NEXT_PUBLIC_BASE_URL ?? window.location.href}/assets/cover.jpg`}
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
      <RedditShareButton title={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<RedditIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="reddit"
          {...props}
        />
      </RedditShareButton>
      <TelegramShareButton title={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<TelegramIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="telegram"
          {...props}
        />
      </TelegramShareButton>
      <TumblrShareButton title={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<TumblrIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="twitter"
          {...props}
        />
      </TumblrShareButton>
      <TwitterShareButton title={desc || t("share.desc")} url={shareUrl}>
        <IconButton
          as="span"
          size="lg"
          variant="outline"
          icon={<TwitterIcon size={iconSize} round bgStyle={{ fill: bgColor }} iconFillColor={iconColor} />}
          aria-label="twitter"
          {...props}
        />
      </TwitterShareButton>
      <WhatsappShareButton title={desc || t("share.desc")} url={shareUrl}>
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
  );
};
