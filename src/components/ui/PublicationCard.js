import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';

// Ícones que você provavelmente tem ou precisará criar:
import {
  PlantFill, // O ícone da planta "Sistema Famato"
  LikeOutlined, // O ícone de coração para likes
  CommentOutlined, // O ícone de balão de fala para comentários
  PinIcon, // O ícone de pino de localização
} from '../Icons/Icons'; // Ajuste o caminho conforme sua estrutura

/**
 * Um card reutilizável para exibir posts de publicação.
 *
 * @param {object} props
 * @param {string} props.author - O nome do autor da publicação (ex: "Sistema Famato").
 * @param {string} props.timeAgo - Quanto tempo faz que foi publicado (ex: "há 1 mês atrás").
 * @param {string} props.description - O texto principal da publicação.
 * @param {string} props.imageUri - A URL da imagem do post.
 * @param {string} props.imageTag - Uma tag de contexto para a imagem (ex: "Pilotagens").
 * @param {string} props.imageTitle - O título na imagem (ex: "Produção Artesanal de Queijos Finos").
 * @param {string} props.imageSubtitle - O subtítulo na imagem (ex: "Chapada dos Guimarães e Colniza").
 * @param {number} props.likesCount - Número de likes.
 * @param {number} props.commentsCount - Número de comentários.
 * @param {function} [props.onPressCard] - Função opcional ao clicar no card.
 * @param {function} [props.onPressLike] - Função opcional ao clicar no like.
 * @param {function} [props.onPressComment] - Função opcional ao clicar no comentário.
 */
export default function PublicationCard({
  author,
  timeAgo,
  description,
  imageUri,
  imageTag,
  imageTitle,
  imageSubtitle,
  likesCount,
  commentsCount,
  onPressCard,
  onPressLike,
  onPressComment,
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPressCard}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <PlantFill color="#00A859" size={ms(30)} style={styles.authorIcon} />
        <View>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.timeAgoText}>{timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.descriptionText}>{description}</Text>

      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.postImage} />
        <View style={styles.imageOverlay}>
          {imageTag && <Text style={styles.imageTag}>{imageTag}</Text>}
          <Text style={styles.imageTitle}>{imageTitle}</Text>
          <View style={styles.imageSubtitleContainer}>
            <PinIcon color="#FFF" size={ms(12)} />
            <Text style={styles.imageSubtitle}>{imageSubtitle}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onPressLike} style={styles.footerAction}>
          <LikeOutlined color="#666" size={ms(18)} />
          <Text style={styles.footerActionText}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressComment} style={styles.footerAction}>
          <CommentOutlined color="#666" size={ms(18)} />
          <Text style={styles.footerActionText}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(12),
    marginTop: ms(10), // Margem superior
    paddingVertical: ms(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    elevation: 4,
    paddingHorizontal: ms(5), // 👈 adiciona espaçamento interno lateral
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(8),
    marginBottom: ms(5),
  },
  authorIcon: {
    marginRight: ms(10),
  },
  authorText: {
    fontFamily: 'Ubuntu-Bold', // Use a fonte que você linkou
    fontSize: ms(14),
    marginLeft: 10,
    color: '#333333',
  },
  timeAgoText: {
    fontFamily: 'Ubuntu-Regular', // Use a fonte que você linkou
    fontSize: ms(12),
    marginLeft: 10,
    color: '#666666',
  },
  descriptionText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(14),
    color: '#333333',
    paddingHorizontal: ms(15),
    marginBottom: ms(10),
    lineHeight: ms(15),
  },
  imageWrapper: {
    width: '100%', // Preenche a largura do card
    height: ms(200), // Altura fixa da imagem
    borderRadius: ms(12),
    overflow: 'hidden', // Importante para o borderRadius funcionar na imagem
    marginBottom: ms(10),
    position: 'relative', // Para posicionar o overlay
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Para cobrir o espaço sem distorcer muito
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // Preenche a imagem
    backgroundColor: 'rgba(0,0,0,0.4)', // Overlay escuro
    justifyContent: 'flex-end', // Alinha conteúdo na parte inferior
    padding: ms(15),
  },
  imageTag: {
    backgroundColor: '#00A859', // Fundo verde para a tag
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Medium',
    fontSize: ms(12),
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
    borderRadius: ms(5),
    alignSelf: 'flex-start', // Alinha a tag à esquerda
    marginBottom: ms(8),
  },
  imageTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(18),
    color: '#FFFFFF',
    marginBottom: ms(15),
  },
  imageSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSubtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(12),
    color: '#FFFFFF',
    marginLeft: ms(5),
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: ms(15),
    borderTopWidth: StyleSheet.hairlineWidth, // Linha fina
    borderTopColor: '#EEEEEE',
    paddingTop: ms(5),
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: ms(20),
  },
  footerActionText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(14),
    color: '#666666',
    marginLeft: ms(5),
  },
});
