import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  isDestructive?: boolean;
};

function MenuItem({ icon, title, value, isDestructive }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={20}
          color={isDestructive ? Colors.danger : Colors.textSecondary}
        />
      </View>
      <Text style={[styles.menuTitle, isDestructive && { color: Colors.danger }]}>{title}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      {!isDestructive && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors.textSecondary}
          style={{ opacity: 0.5 }}
        />
      )}
    </TouchableOpacity>
  );
}

export function ProfileMenu() {
  return (
    <View style={styles.container}>
      {/* Секция 1 */}
      <Text style={styles.sectionHeader}>АККАУНТ</Text>
      <View style={styles.menuBlock}>
        <MenuItem icon="person-outline" title="Личные данные" />
        <View style={styles.divider} />
        <MenuItem icon="shield-checkmark-outline" title="Настройки безопасности" />
        <View style={styles.divider} />
        <MenuItem icon="notifications-outline" title="Уведомления" value="Вкл" />
      </View>

      {/* Секция 2 */}
      <Text style={styles.sectionHeader}>ИНФОРМАЦИЯ</Text>
      <View style={styles.menuBlock}>
        <MenuItem icon="information-circle-outline" title="О приложении" />
        <View style={styles.divider} />
        <MenuItem icon="help-circle-outline" title="Помощь и поддержка" />
        <View style={styles.divider} />
        <MenuItem icon="document-text-outline" title="Политика конфиденциальности" value="Вкл" />
      </View>

      {/* Кнопка выхода */}
      <View style={[styles.menuBlock, styles.logoutBlock]}>
        <MenuItem icon="log-out-outline" title="Выйти из аккаунта" isDestructive />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  menuBlock: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutBlock: {
    marginBottom: 40,
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  menuValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 60,
  },
});
