package com.ds.tree.service;

import java.util.List;

import com.ds.tree.entity.TreeNode;
import com.ds.tree.vo.TreeNodeVO;

public interface TreeNodeService {
	
	TreeNode save(TreeNodeVO treeNode);
	
	List<TreeNodeVO> findAllNodes();
	
	void removeNode(Integer id);
	
	void removeAll();

}
