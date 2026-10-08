import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export default function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('Password123');
  
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentDateObj, setCurrentDateObj] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateObj(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentDateObj.getHours();
    if (hour >= 5 && hour < 12) return { text: "GOOD MORNING", emoji: "☀️" };
    if (hour >= 12 && hour < 17) return { text: "GOOD AFTERNOON", emoji: "🌤️" };
    if (hour >= 17 && hour < 21) return { text: "GOOD EVENING", emoji: "🌆" };
    return { text: "GOOD NIGHT", emoji: "🌙" };
  };
  const greeting = getGreeting();

  const formatCurrentDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return currentDateObj.toLocaleDateString(undefined, options);
  };
  const [isLogin, setIsLogin] = useState(true);

  const authenticate = async () => {
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: email.split('@')[0] })
      });
      const data = await res.json();
      if (data.access_token) {
        setToken(data.access_token);
        fetchDashboard(data.access_token);
      } else {
        alert((isLogin ? "Login" : "Signup") + " failed: " + (data.message || "Unknown error"));
      }
    } catch (e) {
      alert("Network Error: Make sure backend is running");
    }
  };

  const logout = () => {
    setToken(null);
    setActiveTab('Dashboard');
  };

  const fetchDashboard = async (authToken = token) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/dashboard`, { headers: { 'Authorization': `Bearer ${authToken}` } });
      setDashboardData(await res.json());
    } catch(e) {}
    setLoading(false);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`, { headers: { 'Authorization': `Bearer ${token}` } });
      setProjects(await res.json());
    } catch(e) {}
    setLoading(false);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`, { headers: { 'Authorization': `Bearer ${token}` } });
      setTasks(await res.json());
    } catch(e) {}
    setLoading(false);
  };

  const createTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      let pRes = await fetch(`${API_URL}/projects`, { headers: { 'Authorization': `Bearer ${token}` } });
      let projs = await pRes.json();
      let projectId = projs.length > 0 ? projs[0].id : undefined;
      
      if (!projectId) {
        const newProjRes = await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ title: "My Project", status: "NOT_STARTED" })
        });
        const newProj = await newProjRes.json();
        projectId = newProj.id;
      }

      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: newTaskTitle, status: 'PENDING', priority: 'MEDIUM', projectId })
      });
      setNewTaskTitle('');
      fetchTasks();
    } catch (e) {}
  };

  useEffect(() => {
    if (token) {
      if (activeTab === 'Dashboard') fetchDashboard();
      if (activeTab === 'Projects') fetchProjects();
      if (activeTab === 'Tasks') fetchTasks();
    }
  }, [activeTab]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState('Task'); // 'Task' or 'Project'

  const createProject = async () => {
    if (!newProjectTitle.trim()) return;
    try {
      await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: newProjectTitle, status: 'NOT_STARTED' })
      });
      setNewProjectTitle('');
      setIsCreating(false);
      fetchProjects();
    } catch (e) {}
  };

  const createTaskForProject = async () => {
    if (!newTaskTitle.trim() || !selectedProject) return;
    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: newTaskTitle, status: 'PENDING', priority: 'MEDIUM', projectId: selectedProject.id })
      });
      setNewTaskTitle('');
      setIsCreating(false);
      fetchTasks();
    } catch (e) {}
  };

  const createGlobalTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      let projs = projects;
      if (projs.length === 0) {
        let pRes = await fetch(`${API_URL}/projects`, { headers: { 'Authorization': `Bearer ${token}` } });
        projs = await pRes.json();
      }
      let projectId = projs.length > 0 ? projs[0].id : undefined;
      
      if (!projectId) {
        const newProjRes = await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ title: "My Workspace", status: "NOT_STARTED" })
        });
        const newProj = await newProjRes.json();
        projectId = newProj.id;
      }

      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: newTaskTitle, status: 'PENDING', priority: 'MEDIUM', projectId })
      });
      setNewTaskTitle('');
      setIsCreating(false);
      fetchTasks();
    } catch (e) {}
  };

  if (!token) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginContent}>
          <Text style={styles.loginTitle}>{isLogin ? "Welcome back" : "Create account"}</Text>
          <Text style={styles.loginSubtitle}>{isLogin ? "Sign in to your workspace." : "Start organizing your work."}</Text>
          
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9CA3AF" value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={styles.buttonPrimary} onPress={authenticate}>
            <Text style={styles.buttonPrimaryText}>{isLogin ? "Sign in" : "Create account"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchModeBtn} onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchModeText}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Project Detail View
  if (selectedProject) {
    const projectTasks = tasks.filter(t => t.projectId === selectedProject.id);
    return (
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => setSelectedProject(null)} style={{padding: 8, marginLeft: -8}}>
            <Text style={{fontSize: 28, color: '#1F2937', fontWeight: '800'}}>←</Text>
          </TouchableOpacity>
          <Text style={styles.greetingTitle}>{selectedProject.title}</Text>
        </View>
        <View style={styles.mainContent}>
          {isCreating && (
            <View style={styles.createDialog}>
              <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#1F2937'}}>New Task</Text>
              <TextInput style={styles.input} placeholder="Task name..." placeholderTextColor="#9CA3AF" value={newTaskTitle} onChangeText={setNewTaskTitle} autoFocus />
              <View style={styles.dialogActions}>
                <TouchableOpacity style={styles.btnCancel} onPress={() => setIsCreating(false)}>
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={createTaskForProject}>
                  <Text style={styles.btnSubmitText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.sectionHeader}>Tasks</Text>
          <FlatList 
            data={projectTasks}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item}) => (
              <View style={styles.taskCard}>
                <View style={[styles.taskCheckbox, item.status === 'COMPLETED' && styles.taskCheckboxDone]} />
                <View style={{flex: 1}}>
                  <Text style={[styles.taskTitle, item.status === 'COMPLETED' && styles.taskTitleDone]}>{item.title}</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.badgeSafe}><Text style={styles.badgeSafeText}>{item.priority}</Text></View>
                    <View style={styles.badgeSuper}><Text style={styles.badgeSuperText}>{item.status}</Text></View>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={{color: '#9CA3AF', marginTop: 20}}>No tasks yet.</Text>}
          />
        </View>
        {!isCreating && (
          <View style={styles.floatingNavWrapper}>
            <View style={styles.floatingNav}>
              <TouchableOpacity onPress={() => setSelectedProject(null)} style={styles.navItem}>
                <Feather name="home" size={24} color="#828C9A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Feather name="search" size={24} color="#828C9A" />
              </TouchableOpacity>
              
              <View style={{width: 80}} />

              <TouchableOpacity style={styles.navItem}>
                <Feather name="book-open" size={24} color="#828C9A" />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout} style={styles.navItem}>
                <Feather name="user" size={24} color="#828C9A" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.fabWrapper} onPress={() => setIsCreating(true)}>
              <View style={styles.fabInner}><Feather name="plus" size={44} color="#FFFFFF" /></View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
              <Text style={{fontSize: 16, marginRight: 6}}>{greeting.emoji}</Text>
              <Text style={styles.greetingSub}>{greeting.text}</Text>
            </View>
            <Text style={styles.greetingTitle}>Hi, {email.split('@')[0]}!</Text>
            <Text style={{fontSize: 13, color: '#9CA3AF', fontWeight: '700', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5}}>{formatCurrentDate()}</Text>
          </View>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{email.charAt(0).toUpperCase()}</Text></View>
            <View style={styles.notificationDot} />
          </View>
        </View>

        {activeTab === 'Dashboard' && (
          <View style={styles.statsScroll}>
            <View style={styles.statPill}>
              <Text style={styles.statPillLabel}>PROJ</Text>
              <Text style={styles.statPillValue}>{dashboardData?.stats?.totalProjects || 0}</Text>
            </View>
            <View style={[styles.statPill, styles.statPillActive]}>
              <Text style={[styles.statPillValue, {color: '#fff', fontSize: 24, marginBottom: 2}]}>{dashboardData?.stats?.totalTasks || 0}</Text>
              <Text style={[styles.statPillLabel, {color: '#fff', fontSize: 10}]}>Tasks</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statPillLabel}>DONE</Text>
              <Text style={styles.statPillValue}>{dashboardData?.stats?.completedTasks || 0}</Text>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.mainContent}>
        {loading && <ActivityIndicator size="small" color="#1F2937" style={{marginBottom: 16}} />}

        {activeTab === 'Dashboard' && (
          <View style={{flex: 1}}>
            <Text style={styles.sectionHeader}>Let's try this!</Text>
            <Text style={styles.sectionSub}>Highly recommended for today</Text>

            <View style={styles.featuredCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
                <View style={styles.emojiBox}><Text style={{fontSize: 28}}>🚀</Text></View>
                <View style={{flex: 1, marginLeft: 16}}>
                  <Text style={styles.featuredTitle}>Projects</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.badgeSafe}><Text style={styles.badgeSafeText}>ACTIVE</Text></View>
                    <View style={styles.badgeSuper}><Text style={styles.badgeSuperText}>WORKSPACE</Text></View>
                  </View>
                </View>
                <View style={styles.checkCircle}><Text style={{color: '#9CA3AF'}}>✓</Text></View>
              </View>

              <View style={{flexDirection: 'row', gap: 12}}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>STATUS</Text>
                  <Text style={styles.infoValue}>All Good</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>TASKS</Text>
                  <Text style={styles.infoValue}>{dashboardData?.stats?.totalTasks || 0}</Text>
                </View>
              </View>

              <View style={styles.prepCard}>
                <Text style={styles.prepLabel}>⌂ OVERVIEW</Text>
                <Text style={styles.prepText}>Navigate to Projects or Tasks using the bottom menu to manage your workload. No stress required!</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Projects' && (
          <View style={{flex: 1}}>
            <Text style={styles.sectionHeader}>Projects</Text>
            <Text style={styles.sectionSub}>Manage your workload</Text>

            {isCreating && createType === 'Project' && (
              <View style={styles.createDialog}>
                <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#1F2937'}}>New Project</Text>
                <TextInput style={styles.input} placeholder="Project name..." placeholderTextColor="#9CA3AF" value={newProjectTitle} onChangeText={setNewProjectTitle} autoFocus />
                <View style={styles.dialogActions}>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setIsCreating(false)}>
                    <Text style={styles.btnCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSubmit} onPress={createProject}>
                    <Text style={styles.btnSubmitText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <FlatList 
              data={projects}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.featuredCard} onPress={() => setSelectedProject(item)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.emojiBox}><Text style={{fontSize: 28}}>📁</Text></View>
                    <View style={{flex: 1, marginLeft: 16}}>
                      <Text style={styles.featuredTitle}>{item.title}</Text>
                      <View style={styles.badgeRow}>
                        <View style={styles.badgeSafe}><Text style={styles.badgeSafeText}>{item.status.replace('_', ' ')}</Text></View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {activeTab === 'Tasks' && (
          <View style={{flex: 1}}>
            <Text style={styles.sectionHeader}>Tasks</Text>
            <Text style={styles.sectionSub}>Everything on your plate</Text>

            {isCreating && createType === 'Task' && (
              <View style={styles.createDialog}>
                <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#1F2937'}}>New Task</Text>
                <TextInput style={styles.input} placeholder="Task name..." placeholderTextColor="#9CA3AF" value={newTaskTitle} onChangeText={setNewTaskTitle} autoFocus />
                <View style={styles.dialogActions}>
                  <TouchableOpacity style={styles.btnCancel} onPress={() => setIsCreating(false)}>
                    <Text style={styles.btnCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSubmit} onPress={createGlobalTask}>
                    <Text style={styles.btnSubmitText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            <FlatList 
              data={tasks}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 120}}
              renderItem={({item}) => (
                <View style={styles.taskCard}>
                  <View style={[styles.taskCheckbox, item.status === 'COMPLETED' && styles.taskCheckboxDone]} />
                  <View style={{flex: 1}}>
                    <Text style={[styles.taskTitle, item.status === 'COMPLETED' && styles.taskTitleDone]}>{item.title}</Text>
                    <View style={styles.badgeRow}>
                      <View style={styles.badgeSafe}><Text style={styles.badgeSafeText}>{item.priority}</Text></View>
                      <View style={styles.badgeSuper}><Text style={styles.badgeSuperText}>{item.status}</Text></View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>

      {!isCreating && (
        <View style={styles.floatingNavWrapper}>
          <View style={styles.floatingNav}>
            <TouchableOpacity onPress={() => setActiveTab('Dashboard')} style={styles.navItem}>
              <Feather name="home" size={24} color={activeTab === 'Dashboard' ? '#FFFFFF' : '#828C9A'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Projects')} style={styles.navItem}>
              <Feather name="search" size={24} color={activeTab === 'Projects' ? '#FFFFFF' : '#828C9A'} />
            </TouchableOpacity>

            <View style={{width: 80}} />

            <TouchableOpacity onPress={() => setActiveTab('Tasks')} style={styles.navItem}>
              <Feather name="book-open" size={24} color={activeTab === 'Tasks' ? '#FFFFFF' : '#828C9A'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={styles.navItem}>
              <Feather name="user" size={24} color="#828C9A" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.fabWrapper} onPress={() => { setCreateType(activeTab === 'Projects' ? 'Project' : 'Task'); setIsCreating(true); }}>
            <View style={styles.fabInner}><Feather name="plus" size={44} color="#FFFFFF" /></View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEAE2' }, // Warm beige background
  
  /* Login */
  loginContainer: { flex: 1, backgroundColor: '#EFEAE2', justifyContent: 'center', padding: 24 },
  loginContent: { backgroundColor: '#FFFFFF', padding: 32, borderRadius: 40, shadowColor: '#000', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.05, shadowRadius: 20 },
  loginTitle: { fontSize: 32, fontWeight: '800', color: '#1F2937', marginBottom: 8, letterSpacing: -1 },
  loginSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 32 },
  input: { backgroundColor: '#F3F4F6', padding: 16, borderRadius: 16, fontSize: 16, color: '#1F2937', marginBottom: 16, fontWeight: '500' },
  buttonPrimary: { backgroundColor: '#D90429', padding: 18, borderRadius: 99, alignItems: 'center', marginTop: 8 }, // Bright red primary
  buttonPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  switchModeBtn: { marginTop: 24, alignItems: 'center' },
  switchModeText: { color: '#6B7280', fontSize: 15, fontWeight: '600' },

  /* Header Area */
  headerArea: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 24 },
  greetingSub: { fontSize: 13, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1 },
  greetingTitle: { fontSize: 36, fontWeight: '900', color: '#111827', letterSpacing: -1 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 56, height: 56, backgroundColor: '#1F2937', borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
  avatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  notificationDot: { position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, backgroundColor: '#D90429', borderRadius: 8, borderWidth: 3, borderColor: '#FFFFFF' },
  
  /* Horizontal Stats Pill Row */
  statsScroll: { flexDirection: 'row', marginTop: 24, gap: 12 },
  statPill: { backgroundColor: '#FFFFFF', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24, alignItems: 'center', justifyContent: 'center', minWidth: 70, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.03, shadowRadius: 10 },
  statPillActive: { backgroundColor: '#1F2937', paddingHorizontal: 24 },
  statPillLabel: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 4 },
  statPillValue: { fontSize: 22, fontWeight: '800', color: '#1F2937' },

  /* Main Content Area */
  mainContent: { flex: 1, backgroundColor: '#F8F6F1', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24 },
  sectionHeader: { fontSize: 24, fontWeight: '900', color: '#111827', letterSpacing: -0.5 },
  sectionSub: { fontSize: 15, color: '#6B7280', marginBottom: 20, fontWeight: '500' },

  /* Massive Featured Card */
  featuredCard: { backgroundColor: '#FFFFFF', borderRadius: 40, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.04, shadowRadius: 20 },
  emojiBox: { width: 64, height: 64, backgroundColor: '#F3F4F6', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  featuredTitle: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 8 },
  checkCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  
  /* Badges */
  badgeRow: { flexDirection: 'row', gap: 8 },
  badgeSafe: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSafeText: { color: '#065F46', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  badgeSuper: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSuperText: { color: '#4B5563', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

  /* Info Cards inside Featured Card */
  infoCard: { flex: 1, backgroundColor: '#F9FAFB', padding: 16, borderRadius: 20, marginBottom: 16 },
  infoLabel: { fontSize: 10, fontWeight: '800', color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 8 },
  infoValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
  
  /* Prep Card */
  prepCard: { backgroundColor: '#F9FAFB', padding: 20, borderRadius: 24 },
  prepLabel: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 8 },
  prepText: { fontSize: 15, fontWeight: '600', color: '#1F2937', lineHeight: 22 },

  /* Task Cards */
  taskCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  taskCheckbox: { width: 28, height: 28, borderRadius: 14, borderWidth: 3, borderColor: '#E5E7EB', marginRight: 16 },
  taskCheckboxDone: { backgroundColor: '#10B981', borderColor: '#10B981' },
  taskTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  taskTitleDone: { textDecorationLine: 'line-through', color: '#9CA3AF' },

  /* Floating Nav & FAB */
  floatingNavWrapper: { position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center' },
  floatingNav: { backgroundColor: '#222B36', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 72, width: 340, borderRadius: 36, shadowColor: '#000', shadowOffset: {width: 0, height: 12}, shadowOpacity: 0.3, shadowRadius: 24 },
  navItem: { padding: 10 },
  navIcon: { fontSize: 24, color: '#828C9A' },
  navIconActive: { color: '#FFFFFF' },
  fabWrapper: { position: 'absolute', top: -36, left: '50%', marginLeft: -44 },
  fabInner: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#D90429', justifyContent: 'center', alignItems: 'center', borderWidth: 8, borderColor: '#EFEAE2', shadowColor: '#D90429', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.6, shadowRadius: 20, elevation: 8 },
  fabIcon: { color: '#FFFFFF', fontSize: 44, fontWeight: '300', marginTop: -4 },

  /* Dialogs */
  createDialog: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 32, marginBottom: 24, shadowColor: '#000', shadowOffset: {width: 0, height: 10}, shadowOpacity: 0.05, shadowRadius: 20 },
  dialogActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, gap: 12 },
  btnCancel: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 99, backgroundColor: '#F3F4F6' },
  btnCancelText: { fontSize: 15, fontWeight: '700', color: '#4B5563' },
  btnSubmit: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 99, backgroundColor: '#D90429' },
  btnSubmitText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
});
